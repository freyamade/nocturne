class VillageAdminController < AdminBaseController
  def model_name
    "Village"
  end

  def index
    instances = Village.all
    render "admin/instance_list.slang"
  end
end

class VillageController < ApplicationController
  def index
    "Building Normal Page"
  end
end
