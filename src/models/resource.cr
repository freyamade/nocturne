class Resource < Granite::ORM::Base
  adapter pg
  table_name resources

  # Relations
  has_many :resource_stores
  has_many :building_resources

  # id : Int64 primary key is created for you
  field name : String
  # The icon will be stored in static/resources/#{model.icon}
  field icon : String
  timestamps

  # Validation
  validate(:name, "is required.", ->(resource : self) {
    (resource != nil && resource.name != "")
  })

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

  def to_s
    self.name
  end
end
