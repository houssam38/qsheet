'use strict';
const angular = require('angular');
import routes from './admin.routes';
import AdminController from './admin.controller';

export default angular.module('App.admin', [
  'App.auth',
  'ui.router'
])
  .config(routes)
  .controller('AdminController', AdminController)
  .name;
