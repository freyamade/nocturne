class BuildingAdminController < AdminBaseController
  def model_name
    "Building"
  end

  def index
    instances = Building.all
    render "admin/instance_list.slang"
  end

  def new
    # What fields are required for the model and their types I guess
    name = ""
    level = 0
    build_time = 0
    population = 0
    description = ""
    unique_per_village = false
    render "forms/building_create_update.slang", layout: "admin/new_model.slang"
  end

  def create
    # Validate the params and try to create
    unique = false
    if params.key?(:unique_per_village) && params[:unique_per_village] == "on"
      unique = true
    end
    b = Building.new
    b.name = params[:name]
    b.level = params[:level].to_i
    b.build_time = params[:build_time].to_i
    b.population = params[:population].to_i
    b.description = params[:description]
    b.unique_per_village = unique
    if !b.valid?
      name = params[:name]
      level = params[:level]
      build_time = params[:build_time]
      population = params[:population]
      description = params[:description]
      unique_per_village = unique
      b.errors.each do |e|
        flash[:danger] = e.to_s.not_nil!
      end
      return render "forms/building_create_update.slang", layout: "admin/new_model.slang"
    end
    # Everything is good so redirect to the model list with a success message
    b.save
    flash[:success] = "#{b.name} (Level #{b.level}) created successfully!"
    redirect_to location: "../"
  end
end

class BuildingController < ApplicationController
  def index
    "Building Normal Page"
  end
end
