# Seed the Database with the necessary initial data
require "onyx/env"
require "pg"
require "onyx/sql"
require "./models/**"

# Create the Nocturne Village Object
nocturne = Onyx.query(Nocturne::Models::Village.where(name: "Nocturne")).first?
if nocturne.nil?
  # Create the Nocturne Village
  nocturne = Nocturne::Models::Village.new name: "Nocturne"
  nocturne = Onyx.query(nocturne.insert.returning "*").first

  # Create the Build Queue for Nocturne too
  bq = Nocturne::Models::BuildQueue.new village: nocturne
  bq = Onyx.exec bq.insert
end
