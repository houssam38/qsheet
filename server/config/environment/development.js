'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options //
  mongo: {
    //uri: 'mongodb://localhost/-dev'
    uri: 'mongodb://10.138.128.8/-dev'
  },

  // Seed database on startup
  seedDB: true

};
