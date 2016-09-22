'use strict';

export function SheetResource($resource) {
    'ngInject';
    return $resource('/api/sheets/:id/:controller', {
        id: '@_id'
    }, {
        get: {
            method: 'GET',
            params: {
                id: ':id'
            }
        },
        getAnswer : {
            method : 'GET',
            params : {
              id: 'answer/',
              controller : ':id'
            }
        },
        getUserSheets: {
            method: 'GET',
            isArray: true,
        },
        update: {
            method: 'PUT',
            params: {
                id: ':id'
            }
        }
    });
}
