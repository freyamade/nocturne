class BuildQueueAdminController < AdminBaseController
  def model_name
    "Build Queue"
  end

  def index
    instances = BuildQueue.all
    render "admin/instance_list.slang"
  end
end

class BuildQueueController < ApplicationController
  def index
    "BuildQueue Normal Page"
  end
end
