define([
  "lodash",
  "jquery",
  "backbone",
  "views/panel-item"
], function ( _, $, Backbone, PanelView ) {

  var Panel = Backbone.View.extend({

    className: "section-panel",
    tagName: "ul",

    initialize: function () {
      this.listenTo( this.collection, "reset", this.render );
      // this.listenTo( CoderTalk.router, "route:slides", this.showSlide );
      CoderTalk.vent.on( "keynavup", this.show, this );
      CoderTalk.vent.on( "keynavleft keynavright", this.highlight, this );
    },

    render: function () {
      this.collection.forEach( this.addView, this );
      $( "body" ).append( this.$el );
    },

    addView: function ( model ) {
      var slideView = new PanelView({ model: model });
      slideView.render();
      this.$el.append( slideView.el );
    },

    show: function () {
      // show panel
      this.$el.toggleClass( "is-shown" );
      // highlight active panel
      this.$el
        .find( "li" )
          .removeClass( "highlight" )
          .end()
        .find( "li.active" )
          .addClass( "highlight" );
    },

    // highlight next/prev section
    highlight: function ( data ) {
      var total = this.$el.find( "li" ).length,
          current = this.$el.find( ".highlight" ).index(),
          next = ( current !== total - 1 ) ? current + 1 : 0,
          prev = ( current !== 0 ) ? current - 1 : total - 2;

      if ( this.$el.hasClass( "is-shown" ) ) {
        // the panel is shown, highlight the next item
        this.$el
          .find( "li" )
            .removeClass( "highlight" )
            .end()
          .find( "li:eq(" + ( ( data.identifier === "left" ) ? prev : next )  + ")" )
            .addClass( "highlight" )
            .find( "a" )
              .focus();
      }
    }

  });

  return Panel;

});