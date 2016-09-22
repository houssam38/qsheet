'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('answer', {
      url: '/answer',
      template: '<answer></answer>'
    });
}
