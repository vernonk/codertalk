define([
  "_str",
  "backbone",
  "../models/panel-item"
], function ( _str, Backbone, PanelItem ) {

  var Panel = Backbone.Collection.extend({

    model: PanelItem,

    sync: function ( method, model, options ) {
      var sections = [], // final data returned to success/fail
          talks,
          talk,
          talkName;
      // get off of config whether it's on server or built?
      // that way if it's built we know the read should pull from variable
      // on the page, otherwise we can send a quick request off to the api
      // and pull back the content. Then we can use that same api request
      // in the build task to pull back and create the object necessary
      // to display particular pieces of content.
      if ( method === "read" ) {

        talks = CoderTalk.config.sections[ CoderTalk.current.section ];

        for ( var i = 0, l = talks.length; i < l; i++ ) {
          talk = CoderTalk.config.sections[ CoderTalk.current.section ][ i ];
          talk = _str.titleize( talk.match( /([^\/]+)(\.[a-zA-Z]+)$/ )[ 1 ].split( /-|_/ ).join( " " ) );

          // TODO: check as to why current.talk is a string
          sections.push({ "id": i, "title": talk, "active": ( +CoderTalk.current.talk === i ) });
        }

        // need to return a defered to let success handlers execute
        // fail isn't handled as an empty array will be returned if no
        // sections are found.
        return $.when( sections ).done(function ( data ) {
          if ( typeof options.success === "function" ){
            options.success( data );
          }
        });
      } else {
        throw new Error( "Why are you trying to do this? Read only FTW!" );
      }
    }
  });

  return Panel;
});