define([
  "lodash",
  "jquery",
  "backbone",
  "views/slide",
  "codemirror",
  "codemirror-md",
  "codemirror-js",
  "codemirror-css",
  "codemirror-xml",
  "codemirror-html",
  "codemirror-foldcode",
  "codemirror-foldgutter",
  "codemirror-foldbrace",
  "codemirror-foldxml",
  "codemirror-foldcomment"
], function ( _, $, Backbone, SlideView ) {

  var Slides = Backbone.View.extend({

    el: ".slides",

    initialize: function () {
      this.listenTo( this.collection, "reset", this.render );
      this.listenTo( CoderTalk.router, "route:slides", this.showSlide );
      CoderTalk.vent.on( "keynav", this.transition, this );
    },

    render: function () {
      this.collection.forEach( this.addView, this );
      this.codemirror();
      this.showSlide();
      CoderTalk.vent.trigger( "slides:loaded" );
    },

    addView: function ( model ) {
      var slideView = new SlideView({ model: model });
      slideView.render();
      this.$el.append( slideView.el );
    },

    codemirror: function () {
      this.$el
        .find( "textarea[data-role='editor']" )
        .each(function ( i, el ) {
          var $textarea = $( this ),
              mode = $textarea.data( "mode" ),
              config, editor, $editor;

          config = {
            mode: mode,
            theme: "vibrant-ink", // this needs to be from the talk config
            lineNumbers: true,
            lineWrapping: true,
            matchBrackets: true,
            tabMode: "space",
            viewportMargin: Infinity,
            foldGutter: true,
            gutters: [ "CodeMirror-linenumbers", "CodeMirror-foldgutter" ]
          };

          editor = CodeMirror.fromTextArea( el, config );
          $editor = $( editor.display.wrapper );

          // Set attribute that can be used by CSS to show mode label
          $editor.attr( "data-mode", ( typeof mode === "string" ) ? mode : mode.name );
          $editor.data( "cminstance", editor );

        });
    },

    currentSlide: function () {
      return parseInt( CoderTalk.current.slide, 10 ) || 0;
    },

    showSlide: function () {
      // TODO: refactor this, chaining is great but this seems a little out of
      // control now. We've got a cached wrapper so no big deal
      this.$el
        .find( ".current" )
          .removeClass( "current" )
          .end()
        .find( ".slide:eq(" + this.currentSlide() + ")" )
          .find( ".CodeMirror" )
            .each(function () {
              var $el = $( this );
              // position:fixed kills the initial display of CM.
              // Call to refresh must be in a timeout
              setTimeout(function () {
                $el.data( "cminstance" ).refresh();
              }, 0 );
            })
            .end()
          .addClass( "current" );

      CoderTalk.vent.trigger( "slides:show" );
    },

    transition: function ( data ) {
      // See how this works now... functions good but what about not having
      // slides navigate when a panel is visible?  Can we kill that propagation
      // from within the panel view?
      var totalSlides = $( ".slide" ).length - 1,
          currentSlide = this.currentSlide(),
          nextSlide = currentSlide + 1,
          prevSlide = currentSlide - 1,
          baseURL = "/" + CoderTalk.config.slugged_title + "/" + CoderTalk.current.section + "/" + CoderTalk.current.talk + "/";

      // only transition slides if panel isn't displayed
      if ( $( ".section-panel.is-shown" ).length ) {
        return false;
      }

      if ( data.navigate ) {
        if ( data.direction === "forward" ) {
          if ( nextSlide <= totalSlides ) {
            CoderTalk.router.navigate( baseURL + nextSlide, { trigger: true } );
          } else {
            // bring up panel of talks
            CoderTalk.vent.trigger( "slides:end" );
          }
        } else if ( data.direction === "backward" ) {
          if ( prevSlide >= 0 ) {
            CoderTalk.router.navigate( baseURL + prevSlide, { trigger: true } );
          } else {
            // bring up panel of talks
            CoderTalk.vent.trigger( "slides:start" );
          }
        }
      }
    }

    // Not necessary right away but if we move to regions and a different
    // way of displaying views, we'll want some cleanup

  });

  return Slides;

});