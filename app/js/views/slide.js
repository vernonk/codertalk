define([
  "lodash",
  "jquery",
  "backbone",
  "text!../templates/slide.html"
], function ( _, $, Backbone, tpl ) {

  var Slide = Backbone.View.extend({

    className: "slide",

    template: _.template( tpl ),

    initialize: function () {

    },

    render: function () {
      this.$el
        .attr({
          transitionIn: this.model.attributes.config.transitionIn,
          transitionOut: this.model.attributes.config.transitionOut,
          demoAutorun: this.model.attributes.config.demoAutorun
        })
        .addClass( this.model.attributes.config.layout || "default" )
        .html( this.template( this.model.attributes ) );
      return this;
    }

  });

  return Slide;
})