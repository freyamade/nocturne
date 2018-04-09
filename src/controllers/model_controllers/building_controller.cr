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
      # Since alerts are in a hash, just display the first error
      flash[:danger] = b.errors[0].to_s.not_nil!
      return render "forms/building_create_update.slang", layout: "admin/new_model.slang"
    end
    # Everything is good so redirect to the model list with a success message
    b.save
    flash[:success] = "#{b.name} (Level #{b.level}) created successfully!"
    redirect_to location: "../"
  end

  def read
    # Display the information about the currently selected building in a form that can be easily updated
    id : Int64 | Nil
    begin
      id = params[:id].to_i64
    rescue
      flash[:danger] = "Invalid id parameter: #{params[:id]}"
      redirect_to location: "/admin/models/building/"
      return
    end
    b = Building.find id
    if b
      name = b.name
      level = b.level
      build_time = b.build_time
      population = b.population
      description = b.description
      unique_per_village = b.unique_per_village
      render "forms/building_create_update.slang", layout: "admin/new_model.slang"
    else
      flash[:danger] = "No Building with id #{id} found."
      redirect_to location: "/admin/models/building/"
    end
  end

  def update
    # Sent from reading a building and choosing to update its details
    id : Int64 | Nil
    begin
      id = params[:id].to_i64
    rescue
      flash[:danger] = "Invalid id parameter: #{params[:id]}"
      redirect_to location: "/admin/models/building/"
      return
    end
    b = Building.find id
    if b
      unique = false
      if params.key?(:unique_per_village) && params[:unique_per_village] == "on"
        unique = true
      end
      b.name = params[:name]
      b.level = params[:level].to_i
      b.build_time = params[:build_time].to_i
      b.population = params[:population].to_i
      b.description = params[:description]
      b.unique_per_village = unique
      if b.valid?
        b.save
        flash[:success] = "Building successfully updated."
      else
        flash[:danger] = b.errors[0].to_s.not_nil!
        name = params[:name]
        level = params[:level]
        build_time = params[:build_time]
        population = params[:population]
        description = params[:description]
        unique_per_village = unique
      end
      render "forms/building_create_update.slang", layout: "admin/new_model.slang"
    else
      flash[:danger] = "No Building with id #{id} found."
      redirect_to location: "/admin/models/building/"
    end
  end

  def delete
    # Deletes a Building object
    id : Int64 | Nil
    begin
      id = params[:id].to_i64
    rescue
      flash[:danger] = "Invalid id parameter: #{params[:id]}"
      redirect_to location: "/admin/models/building/"
      return
    end
    b = Building.find id
    if b
      b.destroy
      flash[:success] = "Building #{id} successfully deleted."
    else
      flash[:danger] = "No Building with id #{id} found."
    end
    redirect_to location: "/admin/models/building/"
  end
end

class BuildingController < ApplicationController
  def index
    "Building Normal Page"
  end
end
