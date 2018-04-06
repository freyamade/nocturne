-- +micrate Up
CREATE TABLE crafters (
  id BIGSERIAL PRIMARY KEY,
  type VARCHAR,
  skill_level INT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);


-- +micrate Down
DROP TABLE IF EXISTS crafters;
