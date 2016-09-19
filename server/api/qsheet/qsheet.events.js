/**
 * Qsheet model events
 */

'use strict';

import {EventEmitter} from 'events';
import Qsheet from './qsheet.model';
var QsheetEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QsheetEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Qsheet.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    QsheetEvents.emit(event + ':' + doc._id, doc);
    QsheetEvents.emit(event, doc);
  };
}

export default QsheetEvents;
