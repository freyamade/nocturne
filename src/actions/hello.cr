require "onyx/rest"
require "../views/**"

module Nocturne
  module Actions
    struct Hello
      include Onyx::REST::Action

      def call
        return Views::Hello.new "Onyx"
      end
    end
  end
end
