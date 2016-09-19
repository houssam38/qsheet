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
            console.log('createsheet');
            return Sheet.save(sheet,
                function(data) {
                    return 'oookkkkk';
                },
                function(err) {
                    return err;
                }).$promise;
        }
    };

    return SheetManager;
}
