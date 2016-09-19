'use strict';

export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('sheet', {
      url: '/sheet',
      template: require('./sheet.html'),
      controller: 'SheetController',
      controllerAs: 'sheet'
    });
}
