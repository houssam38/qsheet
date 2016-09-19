/**
 * Populate database for Test
 *
 * Disable config/environment/index.js, and set seedDB: false
 */

'use strict';
import User from '../api/user/user.model';
import Sheet from '../api/sheet/sheet.model';
import AnswerSheet from '../api/answerSheet/answerSheet.model';

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

        User.findOne({'email': 'test@example.com'}, (err, user) => {
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
        type: 'Checkbox',
        questions: [
          {
            name: 'Quel est la commande pour récupérer un repo distant',
            order: 1,
            answers: [
              {value: 'commit', right: false},
              {value: 'push', right: false},
              {value: 'clone', right: true},
              {value: 'fetch', right: false}
            ]
          },
          {
            name: 'La commande pour récuper les modification distante',
            order: 2,
            answers: [
              {value: 'commit', right: false},
              {value: 'push', right: false},
              {value: 'pull', right: true},
              {value: 'fetch', right: false}
            ]
          },
          {
            name: 'Quel est la commande pour ajouter une modification',
            order: 3,
            answers: [
              {value: 'commit', right: true},
              {value: 'push', right: false},
              {value: 'clone', right: false},
              {value: 'fetch', right: false}
            ]
          },
          {
            name: 'C\'est quoi GitHub',
            order: 4,
            answers: [
              {value: 'Un logiciel de control de version', right: true},
              {value: 'Un site web communtuaire', right: true},
              {value: 'Un outils microsoft', right: false},
              {value: 'Un truc de Geek', right: false}
            ]
          },
          {
            name: 'Liste de type de type',
            order: 5,
            answers: [
              {value: 'Github', right: true},
              {value: 'GitLab', right: true},
              {value: 'Mercurial', right: false},
              {value: 'TFS', right: false}
            ]
          },
          {
            name: 'Les caractèristiques de Git',
            order: 6,
            answers: [
              {value: 'Centralisé', right: true},
              {value: 'Dé centralisé', right: false},
              {value: 'Gérer le code source', right: true},
              {value: 'Gérer des fichiers binaires', right: false},
              {value: 'Vendre un logiciel', right: false},
              {value: 'Historique du code source', right: true},
              {value: 'Coding social', right: true},

            ]
          },

        ],
        forUser: [
          {email: 'houssam.haned@viacesi.fr'},
          {email: 'houssam.haned2@viacesi.fr'},
          {email: 'houssam.haned3@viacesi.fr'},
          {email: 'houssam.haned4@viacesi.fr'},
        ],
        active: true,
        private: true,
        lock: true,
      })
        .then(() => {
          console.log('finished populating sheet');
          // createAnswerSheet();
        });
    });
}

//function createAnswerSheet() {}



