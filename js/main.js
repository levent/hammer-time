(function () {

  var feedID = 90828,
      sensors = {
        accelerometer : {
          force_x : 0,
          saving : 50,
        }
      };

  // Acceleration
  var ax      = 0;
  var ay      = 0;
  var az      = 0;
  var max_force_x = 0;
  var saved = false;
  var current_weakened = 50;
  var name;
  var modalStart = $('.modal-start');
  var contestantName = $('.js-name');
  var startHammering = false;

  var delay       = 110;

  xively.setKey( "HKOqbnwaas1T3IubGWejOLxwbDmqpwpzdqGDFGP5hSdi7YK0" );
  // ACCELEROMETER

  modalStart.show();

  $('.js-go').on('click', function() {
    name = contestantName.val();
    if (name !== "") {
      contestantName.remove();
      modalStart.hide();
      $('.js-title').html(name);
      startHammering = true
    }
  });

  window.ondevicemotion = function(event) {
    if (startHammering) {
      ax = Math.round(event.accelerationIncludingGravity.x * 100) / 100;
      ay = Math.round(event.accelerationIncludingGravity.y * 100) / 100;
      az = Math.round(event.accelerationIncludingGravity.z * 100) / 100;

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
      }
    }
  };

})();
