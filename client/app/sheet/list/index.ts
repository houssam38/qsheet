'use strict';
const angular = require('angular');
import SheetListController from './list.controller';

export default angular.module('App.sheet.list', ['App.sheet'])
    .controller('SheetListController', SheetListController)
    .name;
