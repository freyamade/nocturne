class Village < Granite::ORM::Base
  adapter pg
  table_name villages

  # Relations
  has_many :resource_stores
  has_many :village_buildings
  belongs_to :build_queue # Each village has a single buildqueue
  has_many :residing_crafters
  has_many :villagers

  # id : Int64 primary key is created for you
  field name : String
  timestamps
end
