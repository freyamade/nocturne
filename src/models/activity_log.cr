class ActivityLog < Granite::Base
  adapter pg
  table_name activity_logs

  # id : Int64 primary key is created for you
  field event : String
  timestamps
end
