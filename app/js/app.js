define([
  "require",
  "lodash",
  "jquery",
  "backbone"
], function ( require, _, $, Backbone ) {

  var App = function () {
    var hashPieces = document.location.hash.split( "/" );
    this.config = codertalkConfig || {}; // not a fan of this
    this.collections = {};
    this.models = {};
    this.views = {};
    this.current = {
      section: hashPieces[ 1 ],
      talk: hashPieces[ 2 ],
      slide: hashPieces[ 3 ]
    };
    this.plugins = App.prototype;
  };

  App.prototype.vent = _.extend( {}, Backbone.Events );

  App.prototype.pluginLoader = function ( plugin ) {
    require( [ "plugins/" + plugin + "/" + plugin ], function ( js ) {
      if ( js && typeof js.initialize === "function" ) {
        js.initialize();
      }
    });
  };

  App.prototype.themeLoader = function ( theme ) {
    // if there is a theme existing use that otherwise fall back to default
    // should make sure there's a trailing slash, just passing for now.
    var themeReq = $.ajax({ url: theme + "/main.css" }),
        stylesheet = document.createElement( "link" );

    stylesheet.setAttribute( "rel", "stylesheet" );
    stylesheet.setAttribute( "type", "text/css" );

    themeReq.then(function () {
      stylesheet.setAttribute( "href", theme + "/main.css" );
      document.getElementsByTagName( "head" )[0].appendChild( stylesheet );
    }, function () {
      stylesheet.setAttribute( "href", "./themes/default/main.css" );
      document.getElementsByTagName( "head" )[0].appendChild( stylesheet );
    });

  };

  return App;
});