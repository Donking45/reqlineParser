const mongoose = require('mongoose');

const reqlineSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['GET', 'POST'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  headers: {
    type: Object,
    default: {},
  },
  query: {
    type: Object,
    default: {},
  },
  body: {
    type: Object,
    default: {},
  },
},  { timestamps: true });

module.exports = mongoose.model('Reqline', reqlineSchema);
