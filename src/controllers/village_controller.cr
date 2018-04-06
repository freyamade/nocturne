class VillageController < ApplicationController
  def json_index
    # Generate JSON from the Nocturne Village
    nocturne = Village.find_by :name, "Nocturne"
    if nocturne
      return nocturne.to_json
    else
      response.status_code = 400
    end
  end
end
