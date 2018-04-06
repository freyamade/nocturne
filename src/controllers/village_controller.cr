class VillageController < ApplicationController
  def json_index
    # Generate JSON from the Nocturne Village
    nocturne = Village.find_by :name, "Nocturne"
    if nocturne
      resource_data = {} of String => Int64
      nocturne.resource_stores.each do |resource_store|
        resource_data[resource_store.resource.name.not_nil!] = resource_store.count.not_nil!
      end
      data = {
        :name      => "Nocturne",
        :resources => resource_data,
      }
      data.to_json
    else
      response.status_code = 400
    end
  end
end
