class FurnishingAdminController < AdminBaseController
  def model_class
    Furnishing
  end

  def new
    model = Furnishing.new
    render "forms/furnishing.slang", layout: "admin/model_form.slang"
  end

  def create
    # Validate params and try to create
    model = Furnishing.new furnishing_params.validate!
    if model.valid? && model.save
      flash[:success] = "#{model.to_s} created successfully!"
      redirect_to location: "../"
    else
      # Re-render with errors
      return render "forms/furnishing.slang", layout: "admin/model_form.slang"
    end
  end

  def read
    # Display the information about the currently selected furnishing in a form that can be easily updated
    id : Int64 | Nil
    begin
      id = params[:id].to_i64
    rescue
      flash[:danger] = "Invalid id parameter: #{params[:id]}"
      redirect_to location: "/admin/models/furnishing/"
      return
    end
    model = Furnishing.find id
    if model
      render "forms/furnishing.slang", layout: "admin/model_form.slang"
    else
      flash[:danger] = "No Furnishing with id #{id} found."
      redirect_to location: "/admin/models/furnishing/"
    end
  end

  def update
    id : Int64 | Nil
    begin
      id = params[:id].to_i64
    rescue
      flash[:danger] = "Invalid id parameter: #{params[:id]}"
      redirect_to location: "/admin/models/furnishing/"
      return
    end
    model = Furnishing.find id
    if model
      # Update the model with the new parameters
      if !furnishing_params.valid?
        flash[:danger] = "Parameters invalid. Please check the sent parameters"
      else
        model.set_attributes furnishing_params.to_h
        if model.valid? && model.save
          flash[:success] = "Furnishing successfully updated."
        end
      end
      render "forms/furnishing.slang", layout: "admin/model_form.slang"
    else
      flash[:danger] = "No Furnishing with id #{id} found."
      redirect_to location: "/admin/models/furnishing/"
    end
  end

  def delete
    id : Int64 | Nil
    begin
      id = params[:id].to_i64
    rescue
      flash[:danger] = "Invalid id parameter: #{params[:id]}"
      redirect_to location: "/admin/models/furnishing/"
      return
    end
    model = Furnishing.find id
    if model
      model.destroy
      flash[:success] = "Furnishing #{id} successfully deleted."
    else
      flash[:danger] = "No Furnishing with id #{id} found."
    end
    redirect_to location: "/admin/models/furnishing/"
  end

  private def furnishing_params
    params.validation do
      required(:name) { |f| !f.nil? }
      required(:level) { |f| !f.nil? }
      required(:description) { |f| !f.nil? }
      required(:ability) { |f| !f.nil? }
    end
  end
end

class FurnishingController < ApplicationController
  def index
    "Furnishing Normal Page"
  end
end
