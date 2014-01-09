define([
  "backbone",
  "../models/slide"
], function ( Backbone, Slide ) {

  var Slides = Backbone.Collection.extend({

    model: Slide,

    sync: function ( method, model, options ) {
      // get off of config whether it's on server or built?
      // that way if it's built we know the read should pull from variable
      // on the page, otherwise we can send a quick request off to the api
      // and pull back the content. Then we can use that same api request
      // in the build task to pull back and create the object necessary
      // to display particular pieces of content.
      if ( method === "read" ) {
        return $.ajax({
          url: "/api/content/?path=" + codertalkConfig.sections[ CoderTalk.current.section ][ parseInt( CoderTalk.current.talk, 10 ) ]
        }).done( function ( data ) {
          if ( typeof options.success === "function" ) {
            options.success( data );
          }
        }).error( function () {
          if ( typeof options.error === "function" ) {
            options.error( data );
          }
        });
      } else {
        throw new Error( "Why are you trying to do this? Read only FTW!" );
      }
    }
  });

  return Slides;
});