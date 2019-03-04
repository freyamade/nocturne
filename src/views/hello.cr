require "onyx/rest"

module Nocturne
  # Views are used to isolate the render handling away from business logic and the server code
  module Views
    struct Hello
      include Onyx::REST::View

      def initialize(@who : String)
      end

      json({
        message: "Hello, #{@who}",
      })
    end
  end
end
