/**
* Role.js
*
* @description :: Represents the role of a user (attendee/speaker/admin?)
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    title: {
      type: "string",
      enum: [ "admin", "attendee", "author", "speaker" ] // how do these differ from registrants for an event? One may be an author and an attendee, how to differentiate when they are one or they other?
    }
  }
};
