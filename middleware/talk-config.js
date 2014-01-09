"use strict";

module.exports = function ( req, res, next ) {

  var fs = require( "fs" ),
      marked = require( "marked" ),
      configPattern = /(?:^<!--[\s]+{[\s]+)([^}]+)(?:}[\s]+-->)/m;

  // this url should have a query string
  // /api/content/config?path=path/to/content.md
  fs.readFile( req.query.path, { encoding: "utf8" }, function ( err, data ) {
    var talkConfig;

    res.setHeader( "Content-Type", "application/json" );
    if ( err ) {
      res.locals.talkConfig = '{ "error": 404, "message": "Content file not found." }';
    } else {
      data = data.split( "\n---" );
      // build out our config object for the slide
      talkConfig = ( configPattern.test( data[ 0 ] ) ) ? JSON.parse( "{" + data[ 0 ].match( configPattern )[1] + "}" ) : null;

      res.locals.talkConfig = JSON.stringify( talkConfig );
    }
    next();
  });

};