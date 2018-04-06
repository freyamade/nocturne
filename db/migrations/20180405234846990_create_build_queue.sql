-- +micrate Up
CREATE TABLE build_queues (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  village_id BIGINT
);


-- +micrate Down
DROP TABLE IF EXISTS build_queues;
