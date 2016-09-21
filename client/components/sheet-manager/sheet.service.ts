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
        getUserSheets: {
            method: 'GET',
            isArray: true,
            params: {
                id: ':id',
                controller: ':usersheets'
            }
        },
        update: {
            method: 'PUT',
            params: {
                id: ':id'
            }
        }
    });
}