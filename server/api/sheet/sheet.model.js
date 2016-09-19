'use strict';

import mongoose from 'mongoose';

var SheetSchema = new mongoose.Schema({
  name: String,
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  questions: [{
    name: String,
    answers: [{
      value: String,
      right: Boolean
    }]
  }],
  dateCreate: {type: Date, default: Date.now},
  dateUpdate: {type: Date, default: null},
  active: Boolean,
  private: Boolean
});

export default mongoose.model('Sheet', SheetSchema);
