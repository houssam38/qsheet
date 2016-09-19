/**
 * Sheet model events
 */

'use strict';

import {EventEmitter} from 'events';
import Sheet from './sheet.model';
var SheetEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SheetEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Sheet.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SheetEvents.emit(event + ':' + doc._id, doc);
    SheetEvents.emit(event, doc);
  };
}

export default SheetEvents;
