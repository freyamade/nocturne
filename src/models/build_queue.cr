class BuildQueue < Granite::Base
  adapter pg
  table_name build_queues

  # Each buildqueue is for one village only
  belongs_to :village
  has_many :build_queue_buildings

  # id : Int64 primary key is created for you
  timestamps

  def to_s
    "Build Queue for #{village.name} with #{build_queue_buildings.size} items"
  end
end
