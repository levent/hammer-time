(function () {

  var feedID = 90828,
      sensors = {
        accelerometer : {
          x : "",
          y : "",
          z : "",
          interval : "",
          alpha : "",
          beta : "",
          gamma : ""
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

  // ACCELEROMETER

  // Position Variables
  var x = 0;
  var y = 0;
  var z = 0;

  // Speed - Velocity
  var vx = 0;
  var vy = 0;
  var vz = 0;

  // Acceleration
  var ax      = 0;
  var ay      = 0;
  var az      = 0;
  var ai      = 0;
  var arAlpha = 0;
  var arBeta  = 0;
  var arGamma = 0;

  var delay       = 110;
  var vMultiplier = 0.01;
  var alpha       = 0;

  var alpha = 0;
  var beta  = 0;
  var gamma = 0;

  // ACCELEROMETER

  window.ondevicemotion = function(event) {
    ax = Math.round(Math.abs(event.accelerationIncludingGravity.x * 1));
    ay = Math.round(Math.abs(event.accelerationIncludingGravity.y * 1));
    az = Math.round(Math.abs(event.accelerationIncludingGravity.z * 1));
    ai = Math.round(event.interval * 100) / 100;
    rR = event.rotationRate;
    if (rR != null) {
      arAlpha = Math.round(rR.alpha);
      arBeta  = Math.round(rR.beta);
      arGamma = Math.round(rR.gamma);
    }

    sensors.accelerometer = {
      x : event.accelerationIncludingGravity.x,
      y : event.accelerationIncludingGravity.y,
      z : event.accelerationIncludingGravity.z,
      interval : event.interval,
      alpha : rR.alpha,
      beta : rR.beta,
      gamma : rR.gamma
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
