(function () {

  xively.setKey( "zng8xuV8tSYuBpecPv11tWzSQMWl7lCl6Opmdx3hQJWHX4wU" );

  // Acceleration
  var ax = 0;
  var max_force_x = 20;
  var saved = false;
  var current_weakened = 50;
  var shouldStart = window.location.search.substring(1).split('=',2)[1];
  var modalStart = $('.modal-start');
  var modalDone = $('.modal-done');
  var started = false;
  var startHammering = false;

  modalStart.show();
  console.log(shouldStart);
  if (typeof(shouldStart) !== "undefined" && shouldStart === "t") {
    modalStart.hide();
    startHammering = true;
  }

  window.ondevicemotion = function(event) {
    if (startHammering) {
      ax = Math.round(event.accelerationIncludingGravity.x * 100) / 100;

      if (Math.abs(ax) > max_force_x) {
        started = true;
        current_weakened = 40;
        max_force_x = Math.abs(ax);
      } else if (started) {
        current_weakened -= 1;
      }

      if (current_weakened <= 0 && !saved) {
        xively.feed.update(526645367, {version : "1.0.0", datastreams: [{id : 'score', current_value : max_force_x}]});
        saved = true;
        startHammering = false;
        modalDone.show();
      }
    }
  };

})();
