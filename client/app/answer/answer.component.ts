'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './answer.routes';

export class AnswerComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
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
