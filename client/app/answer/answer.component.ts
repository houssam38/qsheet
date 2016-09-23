'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './answer.routes';
import {answerService} from "./answer.service";

export class AnswerComponent {
  /*@ngInject*/
  private sheet
  public user
  private accessSheet
  private answerService

  private completedSheet = false

  constructor(SheetManager,$stateParams, $state, answerService, Auth) {

    this.accessSheet = false
    var that = this;
    that.answerService = answerService


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
        Auth.getCurrentUser(function(response) {
          that.user  = response
        })
      }
    })


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

    }, function(reason) {
      console.error('Failed: ' + reason);
      //$state.go('404')
    });

  }


  submitFormUser() {
    console.log('test', this.user)
  }
  submitForm(sheet) {
    var that = this

    var answsers = [];
    angular.forEach(sheet.questions, function(value, key) {
      var userAnswers = {
        idQuestion : value._id,
        response : [],
      }

      angular.forEach(value.answers, function(value2, key2) {
        if(value2.right)
          this.push(value2._id)
      }, userAnswers.response)

      this.push(userAnswers)
    }, answsers);

    var answerSheet = {
      idSheet: sheet._id,
      name : this.user.name,
      //firstName : this.user.firstName,
      email : this.user.email,
      answers : answsers,
    };

    console.log('Display validate form ',  answerSheet)

    this.answerService.createAnswer(answerSheet)
      .then(function(response) {
        if(response.status == 201) {
          that.completedSheet = true
        }
      });

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
