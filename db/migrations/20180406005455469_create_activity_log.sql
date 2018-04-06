-- +micrate Up
CREATE TABLE activity_logs (
  id BIGSERIAL PRIMARY KEY,
  event VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);


-- +micrate Down
DROP TABLE IF EXISTS activity_logs;
