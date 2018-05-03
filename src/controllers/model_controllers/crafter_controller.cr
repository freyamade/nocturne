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
    render "forms/crafter.slang", layout: "admin/model_form.slang"
  end

  def create
    model = Crafter.new crafter_params.validate!
    if model.valid? && model.save
      flash[:success] = "#{model.to_s} created successfully!"
      redirect_to location: "../"
    else
      # Re-render with errors
      return render "forms/crafter.slang", layout: "admin/model_form.slang"
    end
  end

  def read
    id : Int64 | Nil
    begin
      id = params[:id].to_i64
    rescue
      flash[:danger] = "Invalid id parameter: #{params[:id]}"
      redirect_to location: "/admin/models/crafter/"
      return
    end
    model = Crafter.find id
    if model
      render "forms/crafter.slang", layout: "admin/model_form.slang"
    else
      flash[:danger] = "No Crafter with id #{id} found."
      redirect_to location: "/admin/models/crafter/"
    end
  end

  def update
    id : Int64 | Nil
    begin
      id = params[:id].to_i64
    rescue
      flash[:danger] = "Invalid id parameter: #{params[:id]}"
      redirect_to location: "/admin/models/crafter/"
      return
    end
    model = Crafter.find id
    if model
      if !crafter_params.valid?
        flash[:danger] = "Parameters invalid. Please check the sent parameters."
      else
        model.set_attributes crafter_params.to_h
        if model.valid? && model.save
          flash[:success] = "Crafter updated successfully."
        end
      end
      render "forms/crafter.slang", layout: "admin/model_form.slang"
    else
      flash[:danger] = "No Crafter with id #{id} found."
      redirect_to location: "/admin/models/crafter/"
    end
  end

  def delete
    id : Int64 | Nil
    begin
      id = params[:id].to_i64
    rescue
      flash[:danger] = "Invalid id parameter: #{params[:id]}"
      redirect_to location: "/admin/models/crafter/"
      return
    end
    model = Crafter.find id
    if model
      model.destroy
      flash[:success] = "Crafter #{id} successfully deleted."
    else
      flash[:danger] = "No Crafter with id #{id} found."
    end
    redirect_to location: "/admin/models/crafter/"
  end

  private def crafter_params
    params.validation do
      required(:type) { |f| !f.nil? }
      required(:skill_level) { |f| !f.nil? }
    end
  end
end

class CrafterController < ApplicationController
  def index
    "Crafter Normal Page"
  end
end
