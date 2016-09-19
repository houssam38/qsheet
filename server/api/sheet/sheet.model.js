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
      right: Boolean,
      order : Number
    }]
  }],

  // Enable for user email
  forUser : [
    {email:String}
  ],
  dateCreate: {type: Date, default: Date.now},
  dateUpdate: {type: Date, default: null},
  active: Boolean,
  private: Boolean,

  // Lock the sheet
  lock : Boolean,
});

export default mongoose.model('Sheet', SheetSchema);
