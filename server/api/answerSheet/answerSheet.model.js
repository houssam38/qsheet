'use strict';

import mongoose from 'mongoose';

var objectId = mongoose.Schema.ObjectId;

var AnswerSheetSchema = new mongoose.Schema({
  idSheet: objectId,
  name : String,
  firstName : String,
  email : String,
  dateCreate: {type: Date, default: Date.now},
  answers : [{
      idQuestion:objectId,
      date: {
        type : Date,
        default : Date.now
      },
      response : [
        {vale:objectId}
      ]
  }],
  score : Number
});

export default mongoose.model('AnswerSheet', AnswerSheetSchema);
