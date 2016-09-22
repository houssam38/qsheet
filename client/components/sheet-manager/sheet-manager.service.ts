'use strict';
// @flow
class Sheet {
    _id: string = '';
    name: string = '';
    creator: string = '';
}

export function SheetManagerService($location, $http, $cookies, $q, appConfig, Util, Sheet) {
    'ngInject';
    var SheetManager = {
        /**
         * Create a new user
         *
         * @param  {Object}   sheet     - sheet info
         * @param  {Function} callback - function(error, user)
         * @return {Promise}
         */
        createSheet(sheet, callback?: Function) {
            return Sheet.save(sheet,
                function(data) {

                },
                function(err) {
                    return err;
                }).$promise;
        },

        updateSheet(sheet, callback?: Function) {
            return Sheet.update( { id: sheet._id }, sheet, function(res) {

            }, function(err) {

            }).$promise;
        },

        getSheet(sheet, callback?: Function) {
            return Sheet.getAnswer( { id: sheet._id }, sheet, function(res) {

            }, function(err) {
              // TODO gestion des erreur
            }).$promise;
        },

    };

    return SheetManager;
}
