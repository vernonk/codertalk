define([
  "jquery",
  "css!plugins/notify/notify.css"
], function ( $ ) {

  return {
    initialize: function () {
      this.addPanel();
      this.events();
      this.replaceLog();
    },

    events: function () {
      CoderTalk.vent.on( "slides:navigate", function () {
        $( ".notify-panel" ).removeClass( "has-messages" ).empty();
      });
    },

    addPanel: function () {
      $( "<div class='notify-panel' />" ).appendTo( "body" );
    },

    visualLog: function ( msg ) {
      var $panel = $( ".notify-panel" ),
          $messages = $panel.find( ".msg" ),
          $msg = $( "<div class='msg' />" ).html( "Log: " + msg );

      $panel.addClass( "has-messages" );
      // will limit the visual log to 3 messages
      if ( $messages.length  === 3 ) {
        $messages.eq( 2 ).remove();
      }
      $panel.append( $msg );
    },

    replaceLog: function () {
      var visualLog = this.visualLog,
          stored = $.noop;
      if ( window.console ) {
        stored = window.console.log;
      } else {
        window.console = {};
      }

      window.console.log = function ( msg ) {
        stored.apply( this, arguments );
        visualLog( msg );
      };

    }
  }


});