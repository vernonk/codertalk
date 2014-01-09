"use strict";

module.exports = function ( req, res, next ) {

  var fs = require( "fs" ),
      marked = require( "marked" ),
      configPattern = /(?:^<!--[\s]+{[\s]+)([^}]+)(?:}[\s]+-->)/m,
      // codePattern from marked.js to pick up GitHub style fences
      // [1] is the language (e.g. javascript, html, etc)
      // https://github.com/chjj/marked/blob/master/lib/marked.js#L73
      codePattern = /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/gm,
      codemirrorModes = require( "../utils/codemirror-modes" ),
      slides = [], slide, slideConfig;

  // TODO: Think about moving the code pattern, codemirror wrapping,
  // and all that kind of stuff out to utils. Separates the concerns a bit.

  // this url should have a query string
  // /api/content?path=path/to/content.md
  fs.readFile( req.query.path, { encoding: "utf8" }, function ( err, data ) {
    res.setHeader( "Content-Type", "application/json" );
    if ( err ) {
      res.locals.contentJSON = '{ "error": 404, "message": "Content file not found." }';
    } else {
      data = data.replace( codePattern, function ( full, ticks, lang, code ) {

        var mode;

        lang = codemirrorModes[ lang ] || lang;

        if ( typeof lang === "object" ) {
          mode = "data-mode='" + JSON.stringify( lang ) + "'";
        } else {
          mode = "data-mode='" + lang + "'";
        }

        return "\n<div class='code'><textarea data-role='editor' " + mode + ">" + code + "</textarea></div>\n";
      });

      // data = marked( data ).split( "<hr>" );
      data = data.split( "\n---" );

      for ( var i = 0, l = data.length; i < l; i++ ) {
        // build out our config object for the slide
        slideConfig = ( configPattern.test( data[ i ] ) ) ? JSON.parse( "{" + data[ i ].match( configPattern )[1] + "}" ) : null;

        if ( i === 0 ) {
          // title slide, slide doesn't have config
          // this is config for content
          res.locals.contentConfig = slideConfig;
          // slideConfig = null;
        }

        data[ i ] = data[ i ].replace( configPattern, "" );

        slide = {
          id: i,
          content: marked( data[ i ] )
          // config: slideConfig
        };
        if ( slideConfig ) {
          slide.config = slideConfig;
        }

        if ( slide.content.length > 0 ) {
          slides.push( slide );
        }
        slideConfig = null; // reset for next piece
      }

      res.locals.contentJSON = JSON.stringify( slides );
    }
    next();
  });

};