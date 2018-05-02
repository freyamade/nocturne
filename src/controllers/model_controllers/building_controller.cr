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
    model = Building.new
    render "forms/building.slang", layout: "admin/model_form.slang"
  end

  def create
    # Validate the params and try to create
    unique = false
    if params.key?(:unique_per_village) && params[:unique_per_village] == "on"
      unique = true
    end
    model = Building.new building_params.validate!
    model.unique_per_village = unique
    if model.valid? && model.save
      flash[:success] = "#{model.to_s} created successfully!"
      redirect_to location: "../"
    else
      # Re-render with errors
      return render "forms/building.slang", layout: "admin/model_form.slang"
    end
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
    model = Building.find id
    if model
      render "forms/building.slang", layout: "admin/model_form.slang"
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
    model = Building.find id
    if model
      unique = false
      if params.key?(:unique_per_village) && params[:unique_per_village] == "on"
        unique = true
      end
      if !building_params.valid?
        flash[:danger] = "Parameters invalid. Please check the sent parameters"
      else
        model.set_attributes building_params.to_h
        puts model.name
        model.unique_per_village = unique
        if model.valid? && model.save
          flash[:success] = "Building successfully updated."
        end
      end
      render "forms/building.slang", layout: "admin/model_form.slang"
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
    model = Building.find id
    if model
      model.destroy
      flash[:success] = "Building #{id} successfully deleted."
    else
      flash[:danger] = "No Building with id #{id} found."
    end
    redirect_to location: "/admin/models/building/"
  end

  private def building_params
    params.validation do
      required(:name) { |f| !f.nil? }
      required(:level) { |f| !f.nil? }
      required(:build_time) { |f| !f.nil? }
      required(:population) { |f| !f.nil? }
      required(:description) { |f| !f.nil? }
      optional(:unique_per_village) { |f| !f.nil? }
    end
  end
end

class BuildingController < ApplicationController
  def index
    "Building Normal Page"
  end
end
