/**
* Event.js
*
* @description :: Represents an event (collection of talks/attendees)
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    attendees: {
      collection: "User"
    }


  }
};
