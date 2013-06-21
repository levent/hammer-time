(function () {

  xively.setKey( "HKOqbnwaas1T3IubGWejOLxwbDmqpwpzdqGDFGP5hSdi7YK0" );
  var feedID = 90828;

  // Acceleration
  var ax      = 0;
  var max_force_x = 0;
  var saved = false;
  var current_weakened = 50;
  var name = window.location.search.substring(1).split('=',2)[1];
  var modalStart = $('.modal-start');
  var modalDone = $('.modal-done');
  var contestantName = $('.js-name');
  var startHammering = false;

  var delay       = 110;

  // ACCELEROMETER

  modalStart.show();
  if (typeof(name) !== "undefined" && name !== "") {
    modalStart.hide();
    $('.js-title').html(name);
    startHammering = true;
  }

  window.ondevicemotion = function(event) {
    if (startHammering) {
      ax = Math.round(event.accelerationIncludingGravity.x * 100) / 100;

      if (ax < -10 && Math.abs(ax) > max_force_x) {
        current_weakened = 40;
        max_force_x = Math.abs(ax);
      } else {
        current_weakened -= 1;
      }

      if (current_weakened <= 0 && !saved) {
        xively.feed.update(1428560412, {version : "1.0.0", datastreams: [{id : 'score', current_value : max_force_x}, {id : 'contestant', current_value: name}]});
        saved = true;
        startHammering = false;
        modalDone.show();
      }
    }
  };

})();
