class Villager < Granite::Base
  adapter pg
  table_name villagers

  belongs_to :village

  # id : Int64 primary key is created for you
  field name : String
  field race : String
  field gender : String
  timestamps
end
