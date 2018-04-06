-- +micrate Up
CREATE TABLE furnishings (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR,
  level INT,
  description VARCHAR,
  ability VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);


-- +micrate Down
DROP TABLE IF EXISTS furnishings;
