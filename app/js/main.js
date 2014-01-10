require.config({
  paths: {
    "jquery": "../bower_components/jquery/jquery.min",
    "backbone": "../bower_components/backbone/backbone-min",
    "lodash": "../bower_components/lodash/dist/lodash.min",
    "_str": "../bower_components/underscore.string/dist/underscore.string.min",
    "text": "../bower_components/requirejs-text/text",
    "css": "../bower_components/require-css/css",
    "codemirror": "../bower_components/codemirror/lib/codemirror",
    "codemirror-md": "../bower_components/codemirror/mode/markdown/markdown",
    "codemirror-js": "../bower_components/codemirror/mode/javascript/javascript",
    "codemirror-css": "../bower_components/codemirror/mode/css/css",
    "codemirror-html": "../bower_components/codemirror/mode/htmlmixed/htmlmixed",
    "codemirror-xml": "../bower_components/codemirror/mode/xml/xml",
    "codemirror-foldcode": "../bower_components/codemirror/addon/fold/foldcode",
    "codemirror-foldgutter": "../bower_components/codemirror/addon/fold/foldgutter",
    "codemirror-foldbrace": "../bower_components/codemirror/addon/fold/brace-fold",
    "codemirror-foldxml": "../bower_components/codemirror/addon/fold/xml-fold",
    "codemirror-foldcomment": "../bower_components/codemirror/addon/fold/comment-fold"
  },
  shim: {
    "_str": {
      exports: "_.str"
    },
    "backbone": {
      deps: [
        "lodash",
        "jquery"
      ],
      exports: "Backbone"
    },
    "codemirror": {
      exports: "CodeMirror"
    },
    "codemirror-md": [ "codemirror" ],
    "codemirror-js": [ "codemirror" ],
    "codemirror-html": [ "codemirror" ],
    "codemirror-css": [ "codemirror" ],
    "codemirror-xml": [ "codemirror" ],
    "codemirror-foldcode": [ "codemirror" ],
    "codemirror-foldgutter": [ "codemirror" ],
    "codemirror-foldbrace": [ "codemirror" ],
    "codemirror-foldxml": [ "codemirror" ],
    "codemirror-foldcomment": [ "codemirror" ]
  }
});

require([
  "jquery",
  "backbone",
  "app",
  "router",
  "models/talk-config",
  "collections/panel",
  "views/panel",
  "observers",
  "utils/keys"
], function ( $, Backbone, App, Router, TalkConfig, Panel, PanelView, observers, keyBindings ) {

  CoderTalk = new App();
  CoderTalk.router = new Router();

  // Set up our key bindings
  $( document ).on( "keyup", keyBindings );

  // Set up some observers
  observers.initialize();

  // Start watching history
  Backbone.history.start();

  // Get our panel setup (must occur after Backbone.history.start())
  CoderTalk.collections.panel = new Panel();
  CoderTalk.views.panel = new PanelView({ collection: CoderTalk.collections.panel });
  CoderTalk.collections.panel.fetch({ reset: true });

  // Get the current talk config
  CoderTalk.models.talkConfig = new TalkConfig();
  CoderTalk.models.talkConfig.fetch();

});