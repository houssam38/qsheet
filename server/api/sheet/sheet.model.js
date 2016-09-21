'use strict';


import mongoose from 'mongoose';

var SheetSchema = new mongoose.Schema({
  name: String,
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  type : {
    type : String,
    default : 'Checkbox'
  },
  questions: [{
    name: String,
    order : Number,
    answers: [{
      value: String,
      right: Boolean
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
