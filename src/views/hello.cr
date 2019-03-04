require "onyx/rest"

module Nocturne
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
