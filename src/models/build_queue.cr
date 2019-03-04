require "onyx/sql"
require "pg"
require "./village"

module Nocturne
  module Models
    class BuildQueue
      include Onyx::SQL::Model

      schema build_queues do
        pkey id : Int32
        type village : Village, key: "village_id"
      end
    end
  end
end
