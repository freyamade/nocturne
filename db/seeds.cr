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
