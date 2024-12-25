package main

import (
	"context"
	"db2search/src/search_index"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/elastic/go-elasticsearch/v8"
	"github.com/jackc/pglogrepl"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgproto3"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")
	elasticHost := os.Getenv("ELASTICSEARCH_HOST")
	elasticPort := os.Getenv("ELASTICSEARCH_PORT")
	publicationName := "search_publication"
	slotName := "search_slot"

	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s", dbUser, dbPassword, dbHost, dbPort, dbName)
	dsnReplication := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?replication=database", dbUser, dbPassword, dbHost, dbPort, dbName)

	pool, err := pgxpool.New(context.Background(), dsn)
	if err != nil {
		log.Fatalf("Failed to create connection pool: %v", err)
	}
	defer pool.Close()

	config, err := search_index.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	replicationConn, err := pgconn.Connect(context.Background(), dsnReplication)
	if err != nil {
		log.Fatalf("Failed to connect to PostgreSQL: %v", err)
	}
	defer replicationConn.Close(context.Background())

	createPublication(replicationConn, publicationName, config)

	sysident, err := pglogrepl.IdentifySystem(context.Background(), replicationConn)
	if err != nil {
		log.Fatalf("IdentifySystem failed: %v", err)
	}
	log.Printf("SystemID: %s, Timeline: %d, XLogPos: %s, DBName: %s", sysident.SystemID, sysident.Timeline, sysident.XLogPos, sysident.DBName)

	createReplicationSlot(replicationConn, slotName)

	es, err := elasticsearch.NewClient(elasticsearch.Config{
		Addresses: []string{fmt.Sprintf("http://%s:%s", elasticHost, elasticPort)},
	})
	if err != nil {
		log.Fatalf("Failed to connect to Elasticsearch: %v", err)
	}

	timeout := 2 * time.Minute
	elasticConnError := search_index.WaitForElasticsearch(elasticHost, elasticPort, timeout)
	if elasticConnError != nil {
		log.Fatalf("Elasticsearch is not ready: %v", elasticConnError)
	}

	search_index.CreateIndexes(es, config)

	search_index.ReindexAll(pool, es, config, 1000)

	startReplication(replicationConn, es, slotName, publicationName, config, sysident.XLogPos)
}

func createPublication(conn *pgconn.PgConn, publicationName string, config *search_index.Config) {
	tableQueries := []string{}

	for _, table := range config.Tables {
		fields := "*"
		if len(table.Fields) > 0 {
			fieldNames := []string{}
			for _, field := range table.Fields {
				fieldNames = append(fieldNames, field.Name)
			}
			fields = fmt.Sprintf("(%s)", strings.Join(fieldNames, ", "))
		}

		tableQuery := fmt.Sprintf("%s %s", table.Name, fields)
		tableQueries = append(tableQueries, tableQuery)
	}

	query := fmt.Sprintf("CREATE PUBLICATION %s FOR TABLE %s;", publicationName, strings.Join(tableQueries, ", "))
	_, err := conn.Exec(context.Background(), query).ReadAll()
	if err != nil {
		if pgErr, ok := err.(*pgconn.PgError); ok && pgErr.Code == "42710" {
			log.Printf("Publication %s already exists. Skipping.", publicationName)
		} else {
			log.Fatalf("Error creating publication %s: %v", publicationName, err)
		}
	} else {
		log.Printf("Publication %s created successfully.", publicationName)
	}
}

func createReplicationSlot(conn *pgconn.PgConn, slotName string) {
	_, err := pglogrepl.CreateReplicationSlot(context.Background(), conn, slotName, "pgoutput", pglogrepl.CreateReplicationSlotOptions{Temporary: false})
	if err != nil {
		if pgErr, ok := err.(*pgconn.PgError); ok && pgErr.Code == "42710" {
			log.Printf("Replication slot %s already exists.", slotName)
		} else {
			log.Fatalf("Error creating replication slot: %v", err)
		}
	} else {
		log.Printf("Replication slot %s created successfully.", slotName)
	}
}

func startReplication(conn *pgconn.PgConn, es *elasticsearch.Client, slotName, publicationName string, config *search_index.Config, startLSN pglogrepl.LSN) {
	pluginArgs := []string{
		"proto_version '2'",
		fmt.Sprintf("publication_names '%s'", publicationName),
	}

	err := pglogrepl.StartReplication(context.Background(), conn, slotName, startLSN, pglogrepl.StartReplicationOptions{PluginArgs: pluginArgs})
	if err != nil {
		log.Fatalf("Error starting replication: %v", err)
	}
	log.Println("Logical replication started successfully.")

	standbyMessageTimeout := time.Second * 10
	nextStandbyMessageTime := time.Now().Add(standbyMessageTimeout)

	relationsV2 := map[uint32]*pglogrepl.RelationMessageV2{}
	typeMap := pgtype.NewMap()

	// whenever we get StreamStartMessage we set inStream to true and then pass it to DecodeV2 function
	// on StreamStopMessage we set it back to false
	inStream := false

	for {
		if time.Now().After(nextStandbyMessageTime) {
			err := pglogrepl.SendStandbyStatusUpdate(context.Background(), conn, pglogrepl.StandbyStatusUpdate{
				WALWritePosition: startLSN,
			})
			if err != nil {
				log.Printf("Error sending standby status update: %v", err)
			}
			nextStandbyMessageTime = time.Now().Add(standbyMessageTimeout)
		}

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		rawMsg, err := conn.ReceiveMessage(ctx)
		if err != nil {
			if pgconn.Timeout(err) {
				continue
			}
			log.Fatalf("ReceiveMessage failed: %v", err)
		}

		msg, ok := rawMsg.(*pgproto3.CopyData)
		if !ok {
			continue
		}

		switch msg.Data[0] {
		case pglogrepl.PrimaryKeepaliveMessageByteID:
			pkm, err := pglogrepl.ParsePrimaryKeepaliveMessage(msg.Data[1:])
			if err != nil {
				log.Printf("Failed to parse PrimaryKeepaliveMessage: %v", err)
			} else {
				log.Printf("PrimaryKeepaliveMessage: %v", pkm)
			}
		case pglogrepl.XLogDataByteID:
			xld, err := pglogrepl.ParseXLogData(msg.Data[1:])
			if err != nil {
				log.Printf("Failed to parse XLogData: %v", err)
			} else {
				log.Printf("XLogData received: WALStart: %s, WALData: %s", xld.WALStart, string(xld.WALData))
				processWalMessage(xld.WALData, es, config, relationsV2, typeMap, &inStream)
			}
		}
	}
}

func processWalMessage(walData []byte, es *elasticsearch.Client, config *search_index.Config, relations map[uint32]*pglogrepl.RelationMessageV2, typeMap *pgtype.Map, inStream *bool) {
	logicalMsg, err := pglogrepl.ParseV2(walData, *inStream)
	if err != nil {
		log.Fatalf("Parse logical replication message: %s", err)
	}
	log.Printf("Receive a logical replication message: %s", logicalMsg.Type())
	switch logicalMsg := logicalMsg.(type) {
	case *pglogrepl.RelationMessageV2:
		relations[logicalMsg.RelationID] = logicalMsg

	case *pglogrepl.BeginMessage:
		// Indicates the beginning of a group of changes in a transaction. This is only sent for committed transactions. You won't get any events from rolled back transactions.

	case *pglogrepl.CommitMessage:

	case *pglogrepl.InsertMessageV2:
		rel, ok := relations[logicalMsg.RelationID]
		if !ok {
			log.Fatalf("unknown relation ID %d", logicalMsg.RelationID)
		}
		values := map[string]interface{}{}
		var documentID interface{}
		for idx, col := range logicalMsg.Tuple.Columns {
			colName := rel.Columns[idx].Name
			switch col.DataType {
			case 'n': // null
				values[colName] = nil
			case 'u': // unchanged toast
				// TOAST value was not changed, skipping.
			case 't': // text
				val, err := decodeTextColumnData(typeMap, col.Data, rel.Columns[idx].DataType)
				if err != nil {
					log.Fatalln("error decoding column data:", err)
				}
				values[colName] = val

				if colName == "id" {
					documentID = val
				}
			}
		}

		if documentID == nil {
			log.Fatalf("Record missing 'id' field, cannot set Elasticsearch _id: %v", values)
		}

		log.Printf("INSERT INTO %s.%s: %v", rel.Namespace, rel.RelationName, values)

		index := ""
		for _, table := range config.Tables {
			if table.Name == rel.RelationName {
				index = table.Index
				break
			}
		}
		if index == "" {
			log.Printf("No index found for table %s. Skipping.", rel.RelationName)
			return
		}

		err := search_index.SendToElasticsearch(es, index, documentID, values)
		if err != nil {
			log.Printf("Failed to send to Elasticsearch: %v", err)
		}

	case *pglogrepl.UpdateMessageV2:
		rel, ok := relations[logicalMsg.RelationID]
		if !ok {
			log.Fatalf("Unknown relation ID %d", logicalMsg.RelationID)
		}

		values := map[string]interface{}{}
		var documentID interface{}

		for idx, col := range logicalMsg.NewTuple.Columns {
			colName := rel.Columns[idx].Name
			switch col.DataType {
			case 'n': // null
				values[colName] = nil
			case 't': // text
				val, err := decodeTextColumnData(typeMap, col.Data, rel.Columns[idx].DataType)
				if err != nil {
					log.Fatalf("Error decoding column data: %v", err)
				}
				values[colName] = val

				if colName == "id" {
					documentID = val
				}
			}
		}

		if documentID == nil {
			log.Fatalf("Record missing 'id' field, cannot update Elasticsearch _id: %v", values)
		}

		log.Printf("UPDATE on %s.%s: %v", rel.Namespace, rel.RelationName, values)

		index := ""
		for _, table := range config.Tables {
			if table.Name == rel.RelationName {
				index = table.Index
				break
			}
		}
		if index == "" {
			log.Printf("No index found for table %s. Skipping.", rel.RelationName)
			return
		}

		err := search_index.SendToElasticsearch(es, index, documentID, values)
		if err != nil {
			log.Printf("Failed to update Elasticsearch: %v", err)
		}
	case *pglogrepl.DeleteMessageV2:
		rel, ok := relations[logicalMsg.RelationID]
		if !ok {
			log.Fatalf("Unknown relation ID %d", logicalMsg.RelationID)
		}

		var documentID interface{}

		for idx, col := range logicalMsg.OldTuple.Columns {
			colName := rel.Columns[idx].Name
			if colName == "id" {
				val, err := decodeTextColumnData(typeMap, col.Data, rel.Columns[idx].DataType)
				if err != nil {
					log.Fatalf("Error decoding column data: %v", err)
				}
				documentID = val
				break
			}
		}

		if documentID == nil {
			log.Fatalf("Record missing 'id' field, cannot delete Elasticsearch _id")
		}

		log.Printf("DELETE on %s.%s: %v", rel.Namespace, rel.RelationName, documentID)

		index := ""
		for _, table := range config.Tables {
			if table.Name == rel.RelationName {
				index = table.Index
				break
			}
		}
		if index == "" {
			log.Printf("No index found for table %s. Skipping.", rel.RelationName)
			return
		}

		err := search_index.DeleteFromElasticsearch(es, index, documentID)
		if err != nil {
			log.Printf("Failed to delete from Elasticsearch: %v", err)
		}
	case *pglogrepl.TruncateMessageV2:
		log.Printf("TRUNCATE on relations: %v", logicalMsg.RelationIDs)

		for _, relationID := range logicalMsg.RelationIDs {
			rel, ok := relations[relationID]
			if !ok {
				log.Printf("Unknown relation ID %d for TRUNCATE. Skipping.", relationID)
				continue
			}

			index := ""
			for _, table := range config.Tables {
				if table.Name == rel.RelationName {
					index = table.Index
					break
				}
			}
			if index == "" {
				log.Printf("No index found for table %s. Skipping.", rel.RelationName)
				continue
			}

			err := search_index.DeleteAllFromElasticsearch(es, index)
			if err != nil {
				log.Printf("Failed to delete all documents from index %s: %v", index, err)
			} else {
				log.Printf("All documents deleted from index %s due to TRUNCATE.", index)
			}
		}

	case *pglogrepl.TypeMessageV2:
	case *pglogrepl.OriginMessage:

	case *pglogrepl.LogicalDecodingMessageV2:
		log.Printf("Logical decoding message: %q, %q, %d", logicalMsg.Prefix, logicalMsg.Content, logicalMsg.Xid)

	case *pglogrepl.StreamStartMessageV2:
		*inStream = true
		log.Printf("Stream start message: xid %d, first segment? %d", logicalMsg.Xid, logicalMsg.FirstSegment)
	case *pglogrepl.StreamStopMessageV2:
		*inStream = false
		log.Printf("Stream stop message")
	case *pglogrepl.StreamCommitMessageV2:
		log.Printf("Stream commit message: xid %d", logicalMsg.Xid)
	case *pglogrepl.StreamAbortMessageV2:
		log.Printf("Stream abort message: xid %d", logicalMsg.Xid)
	default:
		log.Printf("Unknown message type in pgoutput stream: %T", logicalMsg)
	}
}

func decodeTextColumnData(mi *pgtype.Map, data []byte, dataType uint32) (interface{}, error) {
	if dt, ok := mi.TypeForOID(dataType); ok {
		return dt.Codec.DecodeValue(mi, dataType, pgtype.TextFormatCode, data)
	}
	return string(data), nil
}
