'use strict';
const angular = require('angular');
import routes from './sheet.routes';
import SheetListController from './list/list.controller';
import SheetDetailController from './detail/detail.controller';

export default angular.module('App.sheet', [
        'App.sheet-manager',
        'ui.router'
    ])
    .config(routes)
    .controller('SheetListController', SheetListController)
    .controller('SheetDetailController', SheetDetailController)
    .name;
