'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');
const uiRouter = require('angular-ui-router');
const angularMaterialize = require('angular-materialize');
const angularDragula = require('angular-dragula');
const ngDialog = require('ng-dialog');

// const ngMessages = require('angular-messages');
// import ngValidationMatch from 'angular-validation-match';
import {routeConfig} from './app.config';
import _Auth from '../components/auth/auth.module';
import _SheetManager from '../components/sheet-manager/sheet-manager.module';
import answerService from './answer/answer.service';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import sheet from './sheet';
import answer from './answer/answer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import './app.scss';

angular.module('App', [ngCookies, ngResource, ngSanitize, uiRouter,angularMaterialize,angularDragula(angular),ngDialog,
  _Auth, _SheetManager, answerService, account, admin, sheet, navbar, footer, main, constants, util, answer
]).config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['App'], {
      strictDi: true
    });
  });
