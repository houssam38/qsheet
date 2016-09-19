'use strict';
const angular = require('angular');
import constants from '../../app/app.constants';
import util from '../util/util.module';
import {SheetResource} from './sheet.service';
import {SheetManagerService} from './sheet-manager.service';

const uiRouter = require('angular-ui-router');

export default angular.module('App.sheet-manager', [
        constants,
        util,
        uiRouter
    ])
    .factory('SheetManager', SheetManagerService)
    .factory('Sheet', SheetResource)
    .name;
