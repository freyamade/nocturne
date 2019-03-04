require "onyx/rest"
require "../views/**"

module Nocturne
  # Actions are used to isolate the business logic away from rendering and the server code
  module Actions
    struct Hello
      include Onyx::REST::Action

      # handle params
      params do
        query do
          type who : String = "Onyx" # Set a default value for this parameter
        end
      end

      def call
        return Views::Hello.new params.query.who
      end
    end
  end
end
