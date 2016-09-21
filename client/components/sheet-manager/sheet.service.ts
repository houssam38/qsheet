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
        update: {
            method: 'PUT',
            params: {
                id: ':id'
            }
        }
    });
}