require "onyx/rest"

# Nocturne v2 - Village Building Application for my Fallen Twilight D&D Campaign
# Powered by Crystal, Vue.js and Onyx
module Nocturne
  VERSION = "0.1.0"

  Onyx.get "/" do |env|
    env.response << "Hello, Onyx!"
  end

  Onyx.listen
end
