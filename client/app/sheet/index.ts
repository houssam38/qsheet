'use strict';
const angular = require('angular');
import routes from './sheet.routes';
import SheetController from './sheet.controller';

export default angular.module('App.sheet', [
        'App.auth',
        'ui.router'
    ])
    .config(routes)
    .controller('SheetController', SheetController)
    .name;
