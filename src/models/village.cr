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

  def to_s
    self.name.not_nil!
  end

  # Validation Methods
  validate(:name, "parameter is required.", ->(village : self) {
    (village != nil && village.name != "")
  })

  # Ensure that no other village with the same name exists
  validate(:name, "already exists.", ->(village : self) {
    (village != nil && Village.find_by(:name, village.name).nil?)
  })
end
