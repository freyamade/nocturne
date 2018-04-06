class BuildingAdminController < AdminBaseController
  def index
    model_name = "Building"
    instances = Building.all
    render "admin/instance_list.slang"
  end
end

class BuildingController < ApplicationController
  def index
    "Building Normal Page"
  end
end
