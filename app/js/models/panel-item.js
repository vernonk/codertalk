define([
  "backbone"
], function ( Backbone ) {

  var PanelItem = Backbone.Model.extend({

    defaults: {
      title: "Upcoming Session"
    },

    initialize: function () {

    }
  });

  return PanelItem;
});