define([
  "lodash",
  "jquery",
  "backbone",
  "text!../templates/panel-item.html"
], function ( _, $, Backbone, tpl ) {

  var PanelItem = Backbone.View.extend({

    tagName: "li",

    template: _.template( tpl ),

    initialize: function () {

    },

    render: function () {
      console.log( "active", this.model.attributes.active );
      this.$el
        .toggleClass( "active", this.model.attributes.active )
        .html( this.template( this.model.attributes ) );
      return this;
    }

  });

  return PanelItem;
})