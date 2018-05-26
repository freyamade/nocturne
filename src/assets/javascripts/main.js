import Amber from 'amber'

let buildingModal;
let buildingModalElmnt;

document.addEventListener('DOMContentLoaded', init, false);

if (!Date.prototype.toGranite) {
  (function() {

    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }

    Date.prototype.toGranite = function() {
      return this.getUTCFullYear() +
        '-' + pad(this.getUTCMonth() + 1) +
        '-' + pad(this.getUTCDate()) +
        ' ' + pad(this.getUTCHours()) +
        ':' + pad(this.getUTCMinutes()) +
        ':' + pad(this.getUTCSeconds())  ;
    };

  }());
}

function init() {
    // Initialise the materialize stuff that needs to be initialised
    // Get all tab elements on the page and initialise them
    document.querySelectorAll('.tabs').forEach(e => {
      M.Tabs.init(e);
    });
    document.querySelectorAll('select').forEach(e => {
      M.FormSelect.init(e);
    });
    document.querySelectorAll('.collapsible').forEach(e => {
      M.Collapsible.init(e);
    });
    // Initialise the sidenav
    M.Sidenav.init(document.querySelector('.sidenav'));

    // Handle modal stuff for building description pages and the like
    document.querySelectorAll('.modal').forEach(e => {
      M.Modal.init(e);
    });
    let buildingModalId = '#building-description-modal';
    buildingModalElmnt = document.querySelector(buildingModalId);
    buildingModal = M.Modal.getInstance(buildingModalElmnt);
    document.querySelectorAll(`.modal-trigger[href="${buildingModalId}"`).forEach(e => {
      e.addEventListener('click', openBuildingDetail, false);
    });
}

function openBuildingDetail(e) {
  let buildingId = e.target.dataset.buildingId;
  console.log(buildingId);
  // Send an AJAX request to an API endpoint to read details about the building in question
  // Set up the title of the modal
  buildingModalElmnt.querySelector('#building-title').innerHTML = e.target.innerHTML;
  buildingModal.open();
}