/**
 * AnswerSheet model events
 */

'use strict';

import {EventEmitter} from 'events';
import AnswerSheet from './answerSheet.model';
var AnswerSheetEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AnswerSheetEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  AnswerSheet.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AnswerSheetEvents.emit(event + ':' + doc._id, doc);
    AnswerSheetEvents.emit(event, doc);
  };
}

export default AnswerSheetEvents;
