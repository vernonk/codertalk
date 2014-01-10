define([
  "backbone"
], function ( Backbone ) {

  var TalkConfig = Backbone.Model.extend({

    defaults: {
      title: "TBD",
      plugins: [],
      theme: "themes/default",
      editorTheme: "twilight"
    },

    sync: function ( method, model, options ) {
      if ( method === "read" ) {
        return $.ajax({
          url: "/api/content/config/?path=" + CoderTalk.config.sections[ CoderTalk.current.section ][ parseInt( CoderTalk.current.talk, 10 ) ]
        }).done( function ( data ) {
          if ( typeof options.success === "function" ) {
            options.success( data );
            CoderTalk.vent.trigger( "talkconfig:loaded" );
          }
        }).error( function () {
          if ( typeof options.error === "function" ) {
            options.error( data );
            CoderTalk.vent.trigger( "talkconfig:failed" )
          }
        });
      }
    }
  });

  return TalkConfig;

});