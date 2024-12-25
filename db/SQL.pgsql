SELECT * FROM pg_publication_tables WHERE pubname = 'search_publication';
DROP PUBLICATION search_publication;
CREATE PUBLICATION search_publication FOR ALL TABLES;
ALTER PUBLICATION search_publication DROP TABLE "user";


DELETE FROM pg_publication_tables WHERE tablename IN ('user', 'client', 'master');

CREATE PUBLICATION search_publication FOR TABLE appointment, client, master, appointment_status, channel, master_procedures_procedure, procedure_masters_master, procedure, appointment_procedures_procedure, phone, "user";

SELECT conname AS constraint_name,
       confrelid::regclass AS referenced_table,
       conkey AS referencing_columns,
       confkey AS referenced_columns
FROM pg_constraint
WHERE conrelid = 'appointment_status'::regclass;


SELECT pubname, puballtables, pubinsert, pubupdate, pubdelete FROM pg_publication WHERE pubname = 'search_publication';

CREATE PUBLICATION search_publication FOR TABLE appointment WITH (publish = 'insert');

SELECT * FROM pg_replication_slots;

SELECT * FROM pg_replication_slots WHERE slot_name = 'search_slot';

INSERT INTO appointment (complaints, date, price, "comments", "clientId", "masterId", "statusId") VALUES ('value1', '2023-06-07 15:30:00', 100, 'value2', 1, 1, 1);