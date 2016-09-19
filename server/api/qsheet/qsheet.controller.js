/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/qsheets              ->  index
 * POST    /api/qsheets              ->  create
 * GET     /api/qsheets/:id          ->  show
 * PUT     /api/qsheets/:id          ->  upsert
 * PATCH   /api/qsheets/:id          ->  patch
 * DELETE  /api/qsheets/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Qsheet from './qsheet.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Qsheets
export function index(req, res) {
  return Qsheet.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Qsheet from the DB
export function show(req, res) {
  return Qsheet.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Qsheet in the DB
export function create(req, res) {
  return Qsheet.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Qsheet in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Qsheet.findOneAndUpdate(req.params.id, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Qsheet in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Qsheet.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Qsheet from the DB
export function destroy(req, res) {
  return Qsheet.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
