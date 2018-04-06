-- +micrate Up
CREATE TABLE buildings (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR,
  level INT,
  build_time INT,
  unique_per_village BOOL,
  population INT,
  description VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);


-- +micrate Down
DROP TABLE IF EXISTS buildings;
