class CrafterAdminController < AdminBaseController
  def model_name
    "Crafter"
  end

  def index
    instances = Crafter.all
    render "admin/instance_list.slang"
  end

  def new
    model = Crafter.new
    render "forms/crafter.slang", layout: "admin/new_model.slang"
  end
end

class CrafterController < ApplicationController
  def index
    "Crafter Normal Page"
  end
end
