class AdminBaseController < ApplicationController
  LAYOUT = "admin_application.slang"

  private def redirect_non_admin
    if !signed_in?
      # Redirect to the login page
      flash[:info] = "Must be logged in"
      redirect_to "/signin"
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
