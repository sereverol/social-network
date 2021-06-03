const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  userName: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('file', FileSchema);
