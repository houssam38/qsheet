'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('answer', {
      url: '/answer/:idSheet',
      template: '<answer></answer>'
    });
}
