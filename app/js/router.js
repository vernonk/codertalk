define([
  "backbone"
], function ( Backbone ) {

  var Router = Backbone.Router.extend({

    routes: {
      "": "main",
      ":workshop/:section(/:content)(/:slide)(/)": "slides"
    },

    // kick off the presentation at the first section
    main: function () {
      var baseURL;
      // set the current section & talk to first content from first session
      CoderTalk.current.section = Object.keys( codertalkConfig.sections )[ 0 ];
      CoderTalk.current.talk = 0;
      baseURL = "/" + codertalkConfig.slugged_title + "/" + CoderTalk.current.section + "/" + CoderTalk.current.talk + "/0";
      CoderTalk.router.navigate( baseURL, { trigger: true } );
    },

    slides: function ( workshop, section, contentIndex, slideIndex ) {
      // The object put on the page should have the scetion sluggified
      // already in the future. Otherwise, we can't do a comparison
      // make sure they're slugified from the start for now
      if ( typeof codertalkConfig.sections[ section ] === "undefined" ) {
        CoderTalk.vent.trigger( "error:section", { type: "UNDEFINED", message: section + " is not a valid section from your config." } );
        return;
      }

      // If we're on a new talk, let's reload the page. This could possibly
      // be done better using the slides area as a region and then replacing
      // it with the new pieces.
      if ( CoderTalk.current.talk && CoderTalk.current.talk !== contentIndex ) {
        CoderTalk.vent.trigger( "slides:change" );
        return;
      }

      // set the current section & talk info
      CoderTalk.current.section = section;
      CoderTalk.current.talk = contentIndex;
      CoderTalk.current.slide = slideIndex;

      // If the slides are already in the DOM, don't load them again and again
      if ( !CoderTalk.views.slides ) {
        CoderTalk.vent.trigger( "load:slides" );
      }

      CoderTalk.vent.trigger( "slides:navigate" );

    }
  });

  return Router;

});