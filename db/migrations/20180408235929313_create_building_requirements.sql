-- +micrate Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE building_requirements (
  id BIGSERIAL PRIMARY KEY,
  building_id BIGINT,
  required_building_id BIGINT,
  count BIGINT
);

CREATE INDEX "building_requirements_building_idx" ON building_requirements (building_id);

-- +micrate Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP INDEX "building_requirements_building_idx";
DROP TABLE building_requirements;
