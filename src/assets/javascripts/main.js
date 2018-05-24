import Amber from 'amber'

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
}
