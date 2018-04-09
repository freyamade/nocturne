class AdminBaseController < ApplicationController
  LAYOUT = "admin_application.slang"

  private def redirect_non_admin
    if !signed_in?
      # Redirect to the login page
      flash[:info] = "Please Sign In"
      redirect_to "/signin/?next=#{request.path}"
    end
    # Check that the user is signed in as a user who is an admin
    # Current user can't be nil at this point as we already redirect non-authenticated requests
    if !current_user.not_nil!.admin
      redirect_to "/"
    end
  end

  private def nocturne_id
    return Village.find_by(:name, "Nocturne").not_nil!.id.not_nil!
  end

  before_action do
    all { redirect_non_admin }
  end

  def model_name
    # Overwrite this function in subclasses to change page title
    nil
  end

  def is_read?
    # Determines from the path whether or not the form displayed is a read/update form
    path_end = request.path.split("/")[-2]
    begin
      # If we can parse it as a number, it's a read request
      path_end.to_i64
      true
    rescue
      false
    end
  end
end

class AdminController < AdminBaseController
  def index
    # Index should display a list of the Models and links to their individual pages
    # As well as a view for the activity log
    models = [
      BuildQueue,
      Building,
      Crafter,
      Furnishing,
      Resource,
      Village,
      Villager,
    ]
    relations = [
      BuildQueueBuilding,
      BuildingFurnishing,
      BuildingRequirement,
      BuildingResource,
      RequiredCrafter,
      ResidingCrafter,
      ResourceStore,
      VillageBuilding,
    ]
    activities = ActivityLog.all("ORDER BY created_at DESC")
    render("index.slang")
  end
end
