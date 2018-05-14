class VillageAdminController < AdminBaseController
  def model_name
    "Village"
  end

  def index
    instances = Village.all
    render "admin/instance_list.slang"
  end

  def new
    model = Village.new
    render "forms/village.slang", layout: "admin/model_form.slang"
  end
end

class VillageController < ApplicationController
  def index
    "Building Normal Page"
  end
end
