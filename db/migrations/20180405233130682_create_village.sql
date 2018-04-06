-- +micrate Up
CREATE TABLE villages (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  build_queue_id BIGINT
);


-- +micrate Down
DROP TABLE IF EXISTS villages;
