require "onyx/rest"

module Nocturne
  module Actions
    struct Hello
      include Onyx::REST::Action

      def call
        context.response << "Hello, Onyx!"
      end
    end
  end
end
