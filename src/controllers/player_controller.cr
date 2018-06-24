class PlayerBaseController < ApplicationController
  LAYOUT = "player_application.slang"

  private def redirect_non_player
    if !signed_in?
      # Redirect to login page
      flash[:info] = "Please Sign In"
      redirect_to "/signin/?next=#{request.path}"
    end
    # Check the currently logged in user is a player
    if !current_user.not_nil!.player
      redirect_to "/"
    end
  end

  def nocturne
    # Helper method that just gets the Village instance related to Nocturne
    Village.find_by(name: "Nocturne").not_nil!
  end

  before_action do
    all { redirect_non_player }
  end
end

class PlayerController < PlayerBaseController
  def index
    resources = Resource.all
    render "index.slang"
  end
end

class PlayerAdminController < PlayerBaseController
  # Special controller for admin controls on player pages
  private def redirect_non_player
    if !signed_in?
      # Redirect to login page
      flash[:info] = "Please Sign In"
      redirect_to "/signin/?next=#{request.path}"
    end
    # Check the currently logged in user is a player
    if !current_user.not_nil!.player || !current_user.not_nil!.admin
      redirect_to "/nocturne/"
    end
  end

  def advance_time
    # Handler for the advancement of time
    time_advance : Int64 | Nil # Advancement of time in minutes
    begin
      time_advance = params[:time_advance].to_i64
    rescue
      flash[:warning] = "An invalid time advancement parameter was given: #{params[:time_advance]}"
      redirect_to location: "/nocturne/"
    end
    time_advance = time_advance.not_nil!
    # Update the current build job's time_already_spent with the advancement
    current_job = nocturne.build_queue.build_queue_buildings[0]
    new_time_spent = current_job.time_already_spent.not_nil! + time_advance
    # Check if the current job has finished
    if new_time_spent >= current_job.building.build_time.not_nil!
      # If it has, get the leftover amount of time and pass it onto the next job in the queue
      new_time_spent -= current_job.building.build_time.not_nil!
      # Add one of these buildings to the village
      # Check to see if there is already a village building in Nocturne with this building type
      vb = VillageBuilding.first("WHERE village_id = ? AND building_id = ?", [nocturne.id, current_job.building.id])
      if vb
        # If this isnt the first one of these buildings, increment the count
        vb.count = vb.count.not_nil! + 1_i64
      else
        vb = VillageBuilding.new
        vb.village = nocturne
        vb.building = current_job.building
        vb.count = 1_i64
      end
      vb.save
      # Now destroy the finished job and update the current_job pointer
      current_job.destroy
      current_job = nocturne.build_queue.build_queue_buildings[0]
    end
    # Now update the current_job with the new_time_spent
    current_job.time_already_spent = new_time_spent
    current_job.save
    # Update resource stores with the auto-gen of resources

    # Return to the village overview page
    flash[:success] = "Successfully updated time by #{time_advance} minutes!"
    redirect_to location: "/nocturne/"
  end

  def gather_resource
    # A method that allows for manual admin control over the village's stores
    resource_id : Int64 | Nil
    amount : Int64 | Nil
    begin
      resource_id = params[:resource_id].to_i64
      amount = params[:amount].to_i64
    rescue
      flash[:warning] = "Invalid parameters given for manually adding resource"
      redirect_to location: "/nocturne/"
    end
    # Now just increment the count of nocturne's resource store for this resource
    rs = ResourceStore.first("WHERE resource_id = ? AND village_id = ?", [resource_id, nocturne.id])
    if rs
      rs.count = rs.count.not_nil! + amount.not_nil!
    else
      rs = ResourceStore.new
      rs.village = nocturne
      rs.resource = Resource.find(resource_id).not_nil!
      rs.count = amount.not_nil!
    end
    rs.save
    # Return to the overview page
    flash[:success] = "Successfully added #{amount} more of resource #{resource_id}"
    redirect_to location: "/nocturne/"
  end
end
