require "onyx/sql"
require "pg"
require "./build_queue"

module Nocturne
  module Models
    class Village
      include Onyx::SQL::Model

      schema villages do
        pkey id : Int32
        type name : String
        type build_queue : BuildQueue, foreign_key: "build_queue_id"
      end
    end
  end
end
