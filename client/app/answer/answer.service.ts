'use strict';
const angular = require('angular');

/*@ngInject*/
export  function answerService($location, $http, $cookies, $q, appConfig, Util, User) {
  'ngInject';

  const URL = {
    'check' : '/api/sheets/answerCheck/',
    'post'  : '/api/sheets/answerAuthorization/'
  };

  var Answer = {

    checkAuthorizationDisplay(id, callback?: Function) {
      return $http.get(URL.check + id)
        .then(res => {
          return res.data.access;
        })
        .catch(err => {
          return err
        });
    },

    checkAuthorizationPost(params, callback?: Function) {

      // return $http.post(URL.post,params)
    },

    getSheet(id, callback?: Function) {
      return $http.get('/api/sheets/answer/' + id)
        .then(res => {
          var sheet = res.data

          angular.forEach(sheet.questions, function(value, key) {
            console.log(key, value);
            angular.forEach(value.answers, function(value2, key2) {
              value2.right = false;
              console.log(value2)
            });
          });

          return sheet
        })
        .catch(err => {
          return err;
        });
    },
  };

  return Answer;
}

export default angular.module('App.answer', [])
  .service('answerService', answerService)
  .name;
