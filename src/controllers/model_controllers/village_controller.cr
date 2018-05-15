class VillageAdminController < AdminBaseController
  def model_class
    Village
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
      # Re-render with errors
      return render "forms/village.slang", layout: "admin/model_form.slang"
    end
  end

  def read
    id : Int64 | Nil
    begin
      id = params[:id].to_i64
    rescue
      flash[:danger] = "Invalid id parameter: #{params[:id]}"
      redirect_to location: "/admin/models/village/"
    end
    model = Village.find id
    if model
      render "forms/village.slang", layout: "admin/model_form.slang"
    else
      flash[:danger] = "No Village with id #{id} found."
      redirect_to location: "/admin/models/village/"
    end
  end

  def update
    id : Int64 | Nil
    begin
      id = params[:id].to_i64
    rescue
      flash[:danger] = "Invalid id parameter: #{params[:id]}"
      redirect_to location: "/admin/models/village/"
      return
    end
    model = Village.find id
    if model
      if !village_params.valid?
        flash[:danger] = "Parameters invalid. Please check the sent parameters."
      else
        model.set_attributes village_params.to_h
        if model.valid? && model.save
          flash[:success] = "Village updated successfully."
        end
      end
      render "forms/village.slang", layout: "admin/model_form.slang"
    else
      flash[:danger] = "No Village with id #{id} found."
      redirect_to location: "/admin/models/village/"
    end
  end

  def delete
    id : Int64 | Nil
    begin
      id = params[:id].to_i64
    rescue
      flash[:danger] = "Invalid id parameter: #{params[:id]}"
      redirect_to location: "/admin/models/village/"
    end
    model = Village.find id
    if model
      model.destroy
      flash[:success] = "Village #{id} successfully deleted."
    else
      flash[:danger] = "No Village with id #{id} found."
    end
    redirect_to location: "/admin/models/village/"
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
