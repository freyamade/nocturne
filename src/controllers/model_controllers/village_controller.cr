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

  def create
    model = Village.new village_params.validate!
    if model.valid? && model.save
      flash[:success] = "#{model.to_s} created successfully!"
      redirect_to location: "../"
    else
      return render "forms/village.slang", layout: "admin/model_form.slang"
    end
  end

  private def village_params
    params.validation do
      required(:name) { |f| !f.nil? }
    end
  end
end

class VillageController < ApplicationController
  def index
    "Building Normal Page"
  end
end
