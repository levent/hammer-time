(function () {

  var feedID = 90828,
      sensors = {
        accelerometer : {
          force : 0,
        }
      };

  var $outputs = $(".outputs"),
      template = Handlebars.compile( $("#output-template").html() ),
      sectionTemplate = Handlebars.compile( $("#output-section-template").html() );

  if ('standalone' in navigator && !navigator.standalone && (/iphone|ipod|ipad/gi).test(navigator.platform) && (/Safari/i).test(navigator.appVersion)) {
    $("meta[name=viewport]").attr("content", "width=device-width; initial-scale=1.0;")
  }

  // prepare content

  var appender = "";

  for ( var sensorSection in sensors ) {
    appender += sectionTemplate({ title: sensorSection });

    for ( var sectionItem in sensors[sensorSection] ) {
      appender += template({ section: sensorSection, label: sectionItem, value: "" });
    }
  }

  $outputs.append( appender );

  // Acceleration
  var ax      = 0;
  var ay      = 0;
  var az      = 0;
  var max_force = 0;


  var delay       = 110;

  // ACCELEROMETER

  window.ondevicemotion = function(event) {
    ax = Math.round(Math.abs(event.acceleration.x * 1));
    ay = Math.round(Math.abs(event.acceleration.y * 1));
    az = Math.round(Math.abs(event.acceleration.z * 1));

    var current_force = Math.abs(ax + ay + az);
    if (current_force > sensors.accelerometer.force) {
      max_force = current_force;
    } else {
      max_force = sensors.accelerometer.force;
    }

    sensors.accelerometer = {
      force : max_force,
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
