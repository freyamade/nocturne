class AdminController < ApplicationController
  LAYOUT = "admin_application.slang"
  @@models = [
    BuildQueue,
    Building,
    Crafter,
    Furnishing,
    Resource,
    Village,
    Villager,
  ]
  @@relations = [
    BuildQueueBuilding,
    BuildingFurnishing,
    BuildingResource,
    RequiredCrafter,
    ResidingCrafter,
    ResourceStore,
    VillageBuilding,
  ]

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

  before_action do
    all { redirect_non_admin }
  end

  def index
    # Index should display a list of the Models and links to their individual pages
    # As well as a view for the activity log
    models = @@models
    relations = @@relations
    activities = ActivityLog.all("ORDER BY created_at DESC")
    render("index.slang")
  end

  def model
    index = params[:index].to_i
    @@models[index].name
  end

  def relation
    index = params[:index].to_i
    @@relations[index].name
  end
end
