class Resource < Granite::ORM::Base
  adapter pg
  table_name resources

  # Relations
  has_many :resource_stores
  has_many :building_resources

  # id : Int64 primary key is created for you
  field name : String
  field icon : String
  timestamps

  def to_hash
    data = {} of Symbol => String
    icon = self.icon
    if !icon
      icon = ""
    end
    data = {
      :name => self.name.not_nil!,
      :icon => icon,
    }
  end
end
