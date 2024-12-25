package search_index

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/elastic/go-elasticsearch/v8"
	"github.com/jackc/pgx/v5/pgxpool"
)

func SendToElasticsearch(es *elasticsearch.Client, index string, documentID interface{}, data map[string]interface{}) error {
	body, err := json.Marshal(data)
	if err != nil {
		return fmt.Errorf("failed to marshal data: %w", err)
	}

	res, err := es.Index(index, bytes.NewReader(body), es.Index.WithDocumentID(fmt.Sprintf("%v", documentID)))
	if err != nil {
		return fmt.Errorf("failed to index data: %w", err)
	}
	defer res.Body.Close()

	if res.IsError() {
		return fmt.Errorf("elasticsearch indexing error: %s", res.String())
	}

	log.Printf("Document with _id=%v indexed successfully in %s.", documentID, index)
	return nil
}

func DeleteFromElasticsearch(es *elasticsearch.Client, index string, documentID interface{}) error {
	res, err := es.Delete(index, fmt.Sprintf("%v", documentID))
	if err != nil {
		return fmt.Errorf("failed to delete document: %v", err)
	}
	defer res.Body.Close()

	if res.IsError() {
		body, _ := io.ReadAll(res.Body)
		return fmt.Errorf("error deleting document: %s", string(body))
	}

	log.Printf("Document with _id=%v deleted successfully from %s.", documentID, index)
	return nil
}

func DeleteAllFromElasticsearch(es *elasticsearch.Client, index string) error {
	query := `{"query": {"match_all": {}}}`

	res, err := es.DeleteByQuery(
		[]string{index},
		strings.NewReader(query),
		es.DeleteByQuery.WithRefresh(true),
	)
	if err != nil {
		return fmt.Errorf("failed to execute delete by query: %v", err)
	}
	defer res.Body.Close()

	if res.IsError() {
		body, _ := io.ReadAll(res.Body)
		return fmt.Errorf("error in delete by query: %s", string(body))
	}

	log.Printf("Successfully deleted all documents from index %s.", index)
	return nil
}

func CreateIndexes(es *elasticsearch.Client, config *Config) error {
	for _, table := range config.Tables {
		err := createIndex(es, table)
		if err != nil {
			log.Printf("Failed to create index for table %s. Skipping", table.Name)
			return nil
		}
	}
	return nil
}

func createIndex(es *elasticsearch.Client, table TableConfig) error {
	mapping := map[string]interface{}{
		"mappings": map[string]interface{}{
			"properties": map[string]interface{}{},
		},
	}

	for _, field := range table.Fields {
		fieldConfig := map[string]interface{}{
			"type": field.Type,
		}
		if field.Analyzer != "" {
			fieldConfig["analyzer"] = field.Analyzer
		}
		mapping["mappings"].(map[string]interface{})["properties"].(map[string]interface{})[field.Name] = fieldConfig
	}

	mappingJSON, err := json.Marshal(mapping)
	if err != nil {
		return fmt.Errorf("failed to marshal mapping: %w", err)
	}

	res, err := es.Indices.Create(table.Index, es.Indices.Create.WithBody(strings.NewReader(string(mappingJSON))))
	if err != nil {
		return fmt.Errorf("failed to create index: %w", err)
	}
	defer res.Body.Close()

	if res.IsError() {
		return fmt.Errorf("index creation error: %s", res.String())
	}

	log.Printf("Index %s created successfully.", table.Index)
	return nil
}

func SendBatchToElasticsearch(es *elasticsearch.Client, index string, records []map[string]interface{}) error {
	var bulkBody strings.Builder

	for _, record := range records {
		id, ok := record["id"]
		if !ok {
			return fmt.Errorf("record missing 'id' field: %v", record)
		}

		meta := fmt.Sprintf(`{"index":{"_index":"%s","_id":"%v"}}`, index, id)
		data, err := json.Marshal(record)
		if err != nil {
			return fmt.Errorf("failed to marshal record: %v", err)
		}

		bulkBody.WriteString(meta + "\n")
		bulkBody.WriteString(string(data) + "\n")
		log.Printf("Sending batch to Elasticsearch: %s", bulkBody.String())
	}

	res, err := es.Bulk(strings.NewReader(bulkBody.String()))
	if err != nil {
		return fmt.Errorf("failed to execute bulk request: %v", err)
	}
	defer res.Body.Close()

	if res.IsError() {
		return fmt.Errorf("bulk request error: %s", res.String())
	}

	log.Println("Bulk operation completed successfully.")
	return nil
}

func ReindexAll(pool *pgxpool.Pool, es *elasticsearch.Client, config *Config, batchSize int) {
	var wg sync.WaitGroup
	ctx := context.Background()

	for _, table := range config.Tables {
		wg.Add(1)
		go func(table TableConfig) {
			defer wg.Done()

			offset := 0
			for {
				rows, err := pool.Query(ctx, fmt.Sprintf("SELECT * FROM %s LIMIT %d OFFSET %d", table.Name, batchSize, offset))
				if err != nil {
					log.Printf("Error querying table %s: %v", table.Name, err)
					break
				}

				var records []map[string]interface{}
				for rows.Next() {
					record := make(map[string]interface{})
					values, err := rows.Values()
					if err != nil {
						log.Printf("Error reading row values for table %s: %v", table.Name, err)
						break
					}

					for i, field := range rows.FieldDescriptions() {
						record[string(field.Name)] = values[i]
					}
					records = append(records, record)
				}

				rows.Close()

				if len(records) == 0 {
					break
				}

				err = SendBatchToElasticsearch(es, table.Index, records)
				if err != nil {
					log.Printf("Error sending batch to Elasticsearch for table %s: %v", table.Name, err)
				}

				offset += batchSize
			}
		}(table)
	}

	wg.Wait()
	log.Println("Reindexing completed.")
}

func WaitForElasticsearch(host string, port string, timeout time.Duration) error {
	elasticURL := fmt.Sprintf("http://%s:%s", host, port)
	deadline := time.Now().Add(timeout)

	for time.Now().Before(deadline) {
		resp, err := http.Get(elasticURL)
		if err == nil && resp.StatusCode == http.StatusOK {
			log.Println("Elasticsearch is ready.")
			return nil
		}

		log.Printf("Waiting for Elasticsearch to become ready. Error: %v", err)
		time.Sleep(3 * time.Second)
	}

	return fmt.Errorf("Elasticsearch is not ready after %v", timeout)
}
