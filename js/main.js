(function () {

  var feedID = 90828,
      sensors = {
        accelerometer : {
          force_x : 0,
          saving_in : 50,
        }
      };

  var $outputs = $(".outputs"),
      template = Handlebars.compile( $("#output-template").html() ) ;

  if ('standalone' in navigator && !navigator.standalone && (/iphone|ipod|ipad/gi).test(navigator.platform) && (/Safari/i).test(navigator.appVersion)) {
    $("meta[name=viewport]").attr("content", "width=device-width; initial-scale=1.0;")
  }

  // prepare content

  var appender = "";

  for ( var sensorSection in sensors ) {
    for ( var sectionItem in sensors[sensorSection] ) {
      appender += template({ section: sensorSection, label: sectionItem, value: "" });
    }
  }

  $outputs.append( appender );

  // Acceleration
  var ax      = 0;
  var ay      = 0;
  var az      = 0;
  var max_force_x = 0;
  var saved = false;
  var current_weakened = 50;

  var delay       = 110;

  xively.setKey( "HKOqbnwaas1T3IubGWejOLxwbDmqpwpzdqGDFGP5hSdi7YK0" );
  // ACCELEROMETER

  window.ondevicemotion = function(event) {
    ax = Math.round(event.accelerationIncludingGravity.x * 100) / 100;
    ay = Math.round(event.accelerationIncludingGravity.y * 100) / 100;
    az = Math.round(event.accelerationIncludingGravity.z * 100) / 100;

    if (ax < 0 && Math.abs(ax) > sensors.accelerometer.force_x) {
      current_weakened= 50;
      max_force_x = Math.abs(ax);
    } else {
      current_weakened -= 1;
      max_force_x = sensors.accelerometer.force_x;
    }

    if (current_weakened < 1) {
      sensors.accelerometer = {
        saving_in : current_weakened,
        force_x : max_force_x,
      };
    } else {
      if (saved === false)
        xively.feed.update(1428560412, {version : "1.0.0", datastreams: [{id : 'test', current_value : max_force_x}]});
      saved = true;
    }
  };

  // SEND and SHOW VALUES

  setInterval(function() {

    for ( var sensorSection in sensors ) {
      for ( var sectionItem in sensors[sensorSection] ) {
        $( ".js-"+ sensorSection +"-"+ sectionItem ).find(".output-value").html( sensors[sensorSection][sectionItem] );
      }
    }

  }, delay);

})();
