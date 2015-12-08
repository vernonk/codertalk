/**
* Talk.js
*
* @description :: Represents a collection of slides/tests to create a talk.
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
    slides: {
      collection: "Slide"
    }


  }
};
