const angular = require('angular');

export class FooterComponent {}

export default angular.module('directives.footer', [])
  .component('footerlayout', {
    template: require('./footer.html'),
    controller: FooterComponent
  })
  .name;
