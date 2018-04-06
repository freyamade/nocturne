-- +micrate Up
CREATE TABLE resources (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR,
  icon VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);


-- +micrate Down
DROP TABLE IF EXISTS resources;
