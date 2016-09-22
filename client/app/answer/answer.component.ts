'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './answer.routes';

export class AnswerComponent {
  /*@ngInject*/
  private sheet
  public user
  private accessSheet

  constructor(SheetManager,$stateParams, $state, answerService, Auth) {

    this.accessSheet = false
    var that = this;


    that.user =  {
      name : '',
      firstName : '',
      email : '',
    };

    var id = $stateParams.idSheet;


    Auth.isLoggedIn(function(logged) {
      if(!logged) {
        $state.go('login', {'referrer' : 'answer', 'idSheet' : id});
      } else {
        that.accessSheet = true
      }
    });


    // answerService.checkAuthorizationDisplay(id)
    //   .then(res => {
    //     if(res.status == 404) {
    //       that.accessSheet = -1
    //     } else {
    //       that.accessSheet = res
    //
    //     }
    //
    //   }, function(err)  {
    //       console.error(err)
    //   });


    var getSheet = answerService.getSheet(id);

    getSheet
      .then(function(sheet) {
      console.log('ok', sheet)
      that.sheet = sheet
      // console.log(sheet)
      }, function(error) {
      console.error('Erreur est survenue')
      console.error(error)
    });

    var id = $stateParams.idSheet;
    var promise = SheetManager.getSheet({_id:id});

    promise.then(function(sheet) {
      that.sheet = sheet


      console.log(sheet)
    }, function(reason) {
      console.error('Failed: ' + reason);
      $state.go('404')
    });

  }


  submitFormUser() {
    console.log('test', this.user)
  }
  submitForm(sheet) {
    console.log('Submit form')
    console.log(sheet)
  }
}

export default angular.module('qsheetApp.answer', [uiRouter])
  .config(routes)
  .component('answer', {
    template: require('./answer.html'),
    controller: AnswerComponent,
    controllerAs: 'answerCtrl'
  })
  .name;
