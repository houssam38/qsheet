/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sheets              ->  index
 * POST    /api/sheets              ->  create
 * GET     /api/sheets/:id          ->  show
 * PUT     /api/sheets/:id          ->  upsert
 * PATCH   /api/sheets/:id          ->  patch
 * DELETE  /api/sheets/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Sheet from './sheet.model';

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

// Gets a list of Sheets
export function adminGetSheets(req, res) {
  return Sheet.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Sheet from the DB
export function show(req, res) {
  return Sheet.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Sheet from the DB
export function showUserSheets(req, res) {
  return Sheet.find().exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Return own user sheet
export function userSheet(req, res) {
  var userId = req.user._id;
  return Sheet.find({creator:userId}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}



// Creates a new Sheet in the DB
export function create(req, res) {
  return Sheet.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Sheet in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Sheet.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Sheet in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Sheet.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Sheet from the DB
export function destroy(req, res) {
  return Sheet.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
