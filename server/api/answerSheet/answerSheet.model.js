'use strict';

import mongoose from 'mongoose';

var AnswerSheetSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('AnswerSheet', AnswerSheetSchema);
