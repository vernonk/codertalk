/**
* User.js
*
* @description :: Represents a registered user
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require( "bcrypt" );

module.exports = {

  attributes: {
    firstName: {
      type: "string",
      defaultsTo: ""
    },
    lastName: {
      type: "string",
      defaultsTo: ""
    },
    username: {
      type: "string",
      required: true,
      unique: true
    },
    email: {
      type: "string",
      email: true,
      required: true,
      unique: true
    },
    password: {
      type: "string",
      required: true
    }
    results: {
      collection: "Result"
    },

    beforeCreate: function ( vals, cb ) {
      // encrypt the password
      bcrypt.hash( vals.password, 10, function ( err, hash ) {
        if ( err ) return cb( err );
        vals.password = hash;
        // calling cb() with an argument return as error, helps if something fails.
        cb();
      });

    }

  }
};
