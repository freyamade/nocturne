class ResourceAdminController < AdminBaseController
  def model_name
    "Resource"
  end

  def multipart_form?
    true
  end

  def index
    instances = Resource.all
    render "admin/instance_list.slang"
  end

  def new
    model = Resource.new
    render "forms/resource.slang", layout: "admin/model_form.slang"
  end

  def create
    model = Resource.new resource_params.validate!
    # Sort out the file n stuff
    if params.files.has_key? "icon_file"
      icon_file = params.files["icon_file"]
      model.icon = icon_file.filename
    end
    if model.valid? && model.save
      if params.files.has_key? "icon_file"
        # If we're in here, then icon_file won't be nil
        icon_file = params.files["icon_file"]
        # Create a permanent file for the temporary uploaded file in the correct dir
        File.rename(icon_file.file.path, "static/resources/#{model.icon}")
      end
      flash[:success] = "#{model.to_s} created successfully!"
      redirect_to location: "../"
    else
      # Re-render with errors
      return render "forms/resource.slang", layout: "admin/model_form.slang"
    end
  end

  def read
    id : Int64 | Nil
    begin
      id = params[:id].to_i64
    rescue
      flash[:danger] = "Invalid id parameter: #{params[:id]}"
      redirect_to location: "/admin/models/resource/"
      return
    end
    model = Resource.find id
    if model
      render "forms/resource.slang", layout: "admin/model_form.slang"
    else
      flash[:danger] = "No Resource with id #{id} found."
      redirect_to location: "/admin/models/resource/"
    end
  end

  def update
    id : Int64 | Nil
    begin
      id = params[:id].to_i64
    rescue
      flash[:danger] = "Invalid id parameter: #{params[:id]}"
      redirect_to location: "/admin/models/resource/"
      return
    end
    model = Resource.find id
    if model
      if !resource_params.valid?
        flash[:danger] = "Parameters invalid. Please check the sent parameters."
      else
        # Delete the old icon and replace with the new icon (if a new one was sent)
        if File.exists? "static/resource/#{model.icon}"
          File.delete "static/resources/#{model.icon}"
        end
        model.set_attributes resource_params.to_h
        if params.files.has_key? "icon_file"
          icon_file = params.files["icon_file"]
          model.icon = icon_file.filename
        end
        if model.valid? && model.save
          if params.files.has_key? "icon_file"
            # If we're in here, then icon_file won't be nil
            icon_file = params.files["icon_file"]
            # Create a permanent file for the temporary uploaded file in the correct dir
            File.rename(icon_file.file.path, "static/resources/#{model.icon}")
          end
          flash[:success] = "Resource updated successfully."
        end
      end
      render "forms/resource.slang", layout: "admin/model_form.slang"
    else
      flash[:danger] = "No Resource with id #{id} found."
      redirect_to location: "/admin/models/resource/"
    end
  end

  def delete
    id : Int64 | Nil
    begin
      id = params[:id].to_i64
    rescue
      flash[:danger] = "Invalid id parameter: #{params[:id]}"
      redirect_to location: "/admin/models/resource/"
      return
    end
    model = Resource.find id
    if model
      if !model.icon.nil? && File.exists? "static/resource/#{model.icon}"
        File.delete "static/resource/#{model.icon}"
      end
      model.destroy
      flash[:success] = "Resource #{id} successfully deleted."
    else
      flash[:danger] = "No Resource with id #{id} found."
    end
    redirect_to location: "/admin/models/resource/"
  end

  private def resource_params
    params.validation do
      required(:name) { |f| !f.nil? }
    end
  end
end

class ResourceController < ApplicationController
  def index
    "Resource Normal Page"
  end
end
