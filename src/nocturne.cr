require "onyx/env"
require "onyx/rest"
require "./actions/**"
require "./views/**"

# Nocturne v2 - Village Building Application for my Fallen Twilight D&D Campaign
# Powered by Crystal, Vue.js and Onyx
module Nocturne
  VERSION = "0.0.0"
end

Onyx.get "/", Nocturne::Actions::Hello

Onyx.render :json
Onyx.listen
