'use strict';

export function SheetResource($resource) {
    'ngInject';
    return $resource('/api/sheets/:id/:controller', {
        id: '@_id'
    }, {
        trolololo: {
            method: 'PUT',
            params: {
                controller: 'password'
            }
        },
        get: {
            method: 'GET',
            params: {
                id: 'me'
            }
        }
    });
}
