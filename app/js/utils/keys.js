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
            vent.trigger( "keynav keynavleft", {
              navigate: true,
              direction: "backward",
              identifier: "left",
              event: e
            });
          },
          right: function () {
            vent.trigger( "keynav keynavright", {
              navigate: true,
              direction: "forward",
              identifier: "right",
              event: e
            });
          },
          up: function () {
            vent.trigger( "keynav keynavup", {
              navigate: false,
              identifier: "up",
              event: e
            });
          },
          down: function () {
            vent.trigger( "keynav keynavdown", {
              navigate: false,
              identifier: "down",
              event: e
            });
          },
          enter: function () {
            vent.trigger( "keynav keynaventer", {
              navigate: true,
              direction: "next",
              identifier: "enter",
              event: e
            });
          },
          toggle: function () {
            vent.trigger( "keynav keynavtoggle", {
              navigate: false,
              identifier: "t",
              event: e
            });
          },
          demo: function () {
            vent.trigger( "keynav keynavdemo", {
              navigate: false,
              identifier: "r",
              event: e
            });
          }
        };

    if ( e.altKey && keys[ e.which ] ) {
      nav[ keys[ e.which ] ]();
    }

  };

  return bindKeys;

});