require "onyx/rest"
require "./actions/**"

# Nocturne v2 - Village Building Application for my Fallen Twilight D&D Campaign
# Powered by Crystal, Vue.js and Onyx
module Nocturne
  VERSION = "0.1.0"

  Onyx.get "/", Actions::Hello

  Onyx.listen
end
