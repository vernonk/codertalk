define(function () {

  var bindKeys = function bindKeys ( e ) {

    // `e` is event object passed by jQuery
    // `this` changed by $.proxy to be Marionette.Application object

    var vent = CoderTalk.vent,
        keys = {
          "37": "left",
          "38": "up",
          "39": "right",
          "40": "down",
          "13": "enter",
          "84": "toggle",
          "82": "demo"
        },
        nav = {
          left: function () {
            vent.trigger( "keynav", {
              navigate: true,
              direction: "backward",
              identifier: "left"
            });
          },
          right: function () {
            vent.trigger( "keynav", {
              navigate: true,
              direction: "forward",
              identifier: "right"
            });
          },
          up: function () {
            vent.trigger( "keynav", {
              navigate: false,
              identifier: "up"
            });
          },
          down: function () {
            vent.trigger( "keynav", {
              navigate: false,
              identifier: "down"
            });
          },
          enter: function () {
            vent.trigger( "keynav", {
              navigate: true,
              direction: "next",
              identifier: "enter"
            });
          },
          toggle: function () {
            vent.trigger( "keynav", {
              navigate: false,
              identifier: "t"
            });
          },
          demo: function () {
            vent.trigger( "keynav", {
              navigate: false,
              identifier: "r"
            });
          }
        };

    if ( e.altKey && keys[ e.which ] ) {
      nav[ keys[ e.which ] ]();
    }

  };

  return bindKeys;

});