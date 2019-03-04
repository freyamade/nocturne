require "onyx/rest"
require "../views/**"

module Nocturne
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
