define([
  "jquery",
  "lodash",
  "css!plugins/livedemo/livedemo.css"
], function ( $, _ ) {

  return {

    initialize: function () {
      this.events();
      // since we won't catch the initial route events, call slideChange
      this.slideChange();
    },

    events: function () {
      CoderTalk.vent.on( "slides:show", this.slideChange, this );
    },

    addPreview: function () {
      // preview panel will float to the right of the first .code block
      var $slide = $( ".slide.current" ),
          $preview;

      if ( $slide.find( ".livedemo-preview" ).length ) {
        return;
      }

      $preview = $( "<div class='livedemo-preview' />" );
      $preview.insertBefore( $slide.find( ".code:first" ) );
    },

    getValues: function ( $currentSlide ) {
      var values = {
        htmlmixed: "",
        css: "",
        js: ""
      };

      $( ".slide.current" )
        .find( ".CodeMirror" )
          .each(function () {
            var $el = $( this ),
                instance = $el.data( "cminstance" ),
                mode = $el.data( "mode" ),
                modes = [ "htmlmixed", "css", "javascript" ];

            for ( var i = 0, l = modes.length; i < l; i++ ) {
              if ( mode === modes[ i ] ) {
                values[ mode ] = instance.getValue();
                break;
              }
            }
          });
      return values;
    },

    slideChange: function () {
      var self = this,
          $currentSlide = $( ".slide.current" ),
          slides = CoderTalk.collections.slides,
          slide = slides.findWhere({ id: $currentSlide.index() }),
          slideConfig = ( slide.attributes ) ? slide.attributes.config : {},
          values = self.getValues();

      if ( slideConfig.livedemoPreview ) {
        $currentSlide.find( ".code" ).addClass( "has-preview" );
        // add the preview panel
        this.addPreview();
        this.updatePreview( values );

        $( ".slide.current" )
          .find( ".CodeMirror" )
            .each(function () {
              var instance = $( this ).data( "cminstance" );
              // prevent event stacking
              if ( instance.livedemo ) {
                return;
              }
              // debounce update so that the preview only updates
              // once typing is complete for 750ms (get a feel on timing)
              instance.on( "change", _.debounce(function () {
                var delay;
                instance.livedemo = true;
                clearTimeout(delay);
                delay = setTimeout( function () {
                  self.updatePreview( self.getValues() );
                }, 300 );
              }, 750) );
            });
      }
    },

    updatePreview: function ( values ) {
      var finalString = "";
      if ( values.css ) {
        finalString += "<style>" + values.css + "</style>";
      }
      if ( values.htmlmixed ) {
        finalString += values.htmlmixed;
      }
      if ( values.javascript ) {
        finalString += "<script>" + values.javascript + "</script>";
      }
      $( ".slide.current .livedemo-preview" ).html( finalString );
    }
  };
});
