'use strict';

export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('sheet', {
      url: '/sheet',
      template: require('./list/list.html'),
      controller: 'SheetListController',
      controllerAs: 'sheetList'
    })
      .state('sheet/create', {
          url: '/sheet/create',
          template: require('./detail/detail.html'),
          controller: 'SheetDetailController',
          controllerAs: 'sheetDetail'
      })
      .state('sheet/edit', {
          url: '/sheet/:sheetId',
          template: require('./detail/detail.html'),
          controller: 'SheetDetailController',
          controllerAs: 'sheetDetail'
      });
}
