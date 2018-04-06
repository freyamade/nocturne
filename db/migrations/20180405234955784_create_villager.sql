-- +micrate Up
CREATE TABLE villagers (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  race VARCHAR,
  gender VARCHAR,
  village_id BIGINT
);


-- +micrate Down
DROP TABLE IF EXISTS villagers;
