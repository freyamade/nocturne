require "../config/application.cr"

# Create the Nocturne Village if it's not already done
nocturne = Village.find_by :name, "Nocturne"
if !nocturne
  # If it doesn't already exist, we need to make it
  nocturne = Village.new
  nocturne.name = "Nocturne"
  nocturne.save
end

# Create Nocturne's Build Queue if it doesn't exist
bq = BuildQueue.find_by :village_id, nocturne.id
if !bq
  bq = BuildQueue.new
  bq.village_id = nocturne.id
  bq.save
  nocturne.build_queue_id = bq.id
  nocturne.save
end

# Create the initial stuff I have planned
# Resources
# Logs
logs = Resource.find_by :name, "Logs"
if !logs
  logs = Resource.new
  logs.name = "Logs"
  logs.save

  # Add enough logs for one house to Nocturne
  logs_rs = ResourceStore.new
  logs_rs.resource_id = logs.id
  logs_rs.village_id = nocturne.id
  logs_rs.count = 40_i64
  logs_rs.save
end

# Wool
wool = Resource.find_by :name, "Wool"
if !wool
  wool = Resource.new
  wool.name = "Wool"
  wool.save

  # Add enough wool for one basic house
  wool_rs = ResourceStore.new
  wool_rs.resource_id = wool.id
  wool_rs.village_id = nocturne.id
  wool_rs.count = 2_i64
  wool_rs.save
end

# Furnishings
# Basic Bed
basic_bed = Furnishing.all("WHERE level = 1 AND name = 'Bed'").first?
if !basic_bed
  basic_bed = Furnishing.new
  basic_bed.name = "Bed"
  basic_bed.level = 1
  basic_bed.description = "A basic bed. Nothing too fancy but it sure beats the ground."
  basic_bed.ability = "When sleeping in this bed, roll a D20. On a roll of 20, gain 1/8 of your max HP as temporary HP"
  basic_bed.save
end

# Crafters
a_carpenter = Crafter.all("WHERE skill_level = 1 AND type = 'Carpenter'").first?
if !a_carpenter
  a_carpenter = Crafter.new
  a_carpenter.skill_level = 1
  a_carpenter.type = "Carpenter"
  a_carpenter.save
  # Assign Aria to Nocturne
  rc = ResidingCrafter.new
  rc.village_id = nocturne.id
  rc.crafter_id = a_carpenter.id
  rc.name = "Aria Sandstone"
  rc.save
end

# Building
basic_house = Building.all("WHERE level = 1 AND name = 'House'").first?
if !basic_house
  basic_house = Building.new
  basic_house.name = "House"
  basic_house.level = 1
  basic_house.build_time = 4 * 60
  basic_house.unique_per_village = false
  basic_house.population = 1
  basic_house.description = "A small house. It doesn't have much but it's better than sleeping outside."
  basic_house.save

  # Set up all the relations this needs to track
  # Materials required
  bh_logs = BuildingResource.new
  bh_logs.building_id = basic_house.id
  bh_logs.resource_id = logs.id
  bh_logs.count = 40_i64
  bh_logs.save
  bh_wool = BuildingResource.new
  bh_wool.building_id = basic_house.id
  bh_wool.resource_id = wool.id
  bh_wool.count = 2_i64
  bh_wool.save

  # Furnishings
  bf = BuildingFurnishing.new
  bf.building_id = basic_house.id
  bf.furnishing_id = basic_bed.id
  bf.count = 1_i64
  bf.save

  # Required Crafters
  req = RequiredCrafter.new
  req.building_id = basic_house.id
  req.crafter_id = a_carpenter.id
  req.save
end
