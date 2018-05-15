class BuildQueueAdminController < AdminBaseController
  def model_class
    BuildQueue
  end
end

class BuildQueueController < ApplicationController
  def index
    "BuildQueue Normal Page"
  end
end
