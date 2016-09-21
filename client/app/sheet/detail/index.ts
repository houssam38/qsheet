'use strict';
const angular = require('angular');
import SheetDetailController from './detail.controller';

export default angular.module('App.sheet.detail', ['App.sheet'])
    .controller('SheetDetailController', SheetDetailController)
    .name;
