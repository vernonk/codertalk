define([
  "jquery",
  "collections/slides",
  "views/slides"
], function ( $, Slides, SlidesView ) {

  // Not really a fan of how this is being done. At some point put some more
  // thought into this.

  var observers = {

    initialize: function () {

      this.loaded();
      this.loading();
      this.errors();
      this.slides();

    },

    loaded: function () {

      // Load necessary theme files when a talk configuration file is loaded
      CoderTalk.vent.on( "talkconfig:loaded", function () {
        CoderTalk.themeLoader( CoderTalk.models.talkConfig.attributes.theme );
      });

      // Load necessary plugins when a talk configuration file is loaded
      CoderTalk.vent.on( "talkconfig:loaded", function () {
        var plugins = CoderTalk.models.talkConfig.attributes.plugins;
        if ( Array.isArray( plugins ) ) {
          plugins.forEach(function ( plugin ) {
            CoderTalk.pluginLoader( plugin );
          });
        }
        CoderTalk.vent.trigger( "plugins:loaded" );
      });

    },

    loading: function () {

      CoderTalk.vent.on( "load:slides", function () {
        CoderTalk.collections.slides = new Slides();
        CoderTalk.views.slides = new SlidesView({ collection: CoderTalk.collections.slides } );
        CoderTalk.collections.slides.fetch({ reset: true });
      });

      // Should we keep a single "current-slide" and update that as a region
      // rather than having all the views in the DOM?

    },

    errors: function () {

      CoderTalk.vent.on( "error:section", function ( err ) {
        console.warn( err.type, "ERROR:", err.message );
      });

    },

    slides: function () {

      CoderTalk.vent.on( "slides:change", function () {
        console.log( "observed change!" );
        document.location.reload();
      });

    }

  };

  return observers;
});