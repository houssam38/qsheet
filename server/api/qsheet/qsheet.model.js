'use strict';

import mongoose from 'mongoose';

var QsheetSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Qsheet', QsheetSchema);
