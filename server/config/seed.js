/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Sheet from '../api/sheet/sheet.model';

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');

      User.findOne({'email':'test@example.com'}, (err,user) => {
        createSheetSeed(user._id);
      });

    });
  });



function createSheetSeed(userId) {

  Sheet.find({}).remove()
    .then(() => {
      Sheet.create({
        name: 'Test sur github pour le cesi',
        creator: userId,
        type : 'Checkbox',
        questions: [{
          name: 'Quel est la commande pour récupérer un repo distant',
          order : 1,
          answers: [
            {value: 'commit', right: false},
            {value: 'push',   right: false},
            {value: 'clone',  right: true},
            {value: 'fetch',  right: false}
          ]
        }],
        forUser : [
          {email:'houssam.haned@viacesi.fr'},
          {email:'houssam.haned2@viacesi.fr'},
          {email:'houssam.haned3@viacesi.fr'},
          {email:'houssam.haned4@viacesi.fr'},
        ],
        active: true,
        private: true,
        lock : true,
      })
        .then(() => {
          console.log('finished populating sheet');
        });
    });


}



