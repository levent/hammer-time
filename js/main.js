(function () {

  var feedID = 90828,
      sensors = {
        accelerometer : {
          force_x : 0,
          force_y : 0,
          force_z : 0,
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
  var max_force_y = 0;
  var max_force_z = 0;


  var delay       = 110;

  // ACCELEROMETER

  window.ondevicemotion = function(event) {
    ax = Math.round(event.accelerationIncludingGravity.x * 1);
    ay = Math.round(event.accelerationIncludingGravity.y * 1);
    az = Math.round(event.accelerationIncludingGravity.z * 1);

    var current_force = Math.abs(ax + ay + az);
    if (ax > sensors.accelerometer.force_x) {
      max_force_x = ax;
    } else {
      max_force_x = sensors.accelerometer.force_x;
    }

    if (ay > sensors.accelerometer.force_y) {
      max_force_y = ay;
    } else {
      max_force_y = sensors.accelerometer.force_y;
    }

    if (az > sensors.accelerometer.force_z) {
      max_force_z = az;
    } else {
      max_force_z = sensors.accelerometer.force_z;
    }


    sensors.accelerometer = {
      force_x : max_force_x,
      force_y : max_force_y,
      force_z : max_force_z,
    };
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
