define([
  "backbone"
], function ( Backbone ) {

  var Slide = Backbone.Model.extend({
    defaults: {
      content: "",
      config: {
        layout: "default",
        demoAutorun: false,
        transitionIn: "slide",
        transitionOut: "slide"
      }
    },

    initialize: function () {
      var $tmp = $( "<div />" ),
          $header = $( "<header />" ),
          settings = {};

      $tmp.html( this.attributes.content );

      $tmp.children().each(function ( i, el ) {
        var $el = $( this );

        if ( $el.is( "h1, h2" ) ) {
          $header.append( el.outerHTML );
          $el.remove();
          return true;
        } else if ( $el.is( "p" ) && $el.html() === "" ) {
          $el.remove();
          return true;
        } else {
          // nothing we care about (not a header or empty paragraph)
          return false;
        }
      });

      if ( $header.children().length && !$tmp.children().length ) {
        settings.config = {};
        settings.config.layout = "title";
      }

      if ( $header.children().length ) {
        settings.content = $header[0].outerHTML + $tmp.html();
      }

      // update content property on the model
      this.set( settings );
    }
  });

  return Slide;
});