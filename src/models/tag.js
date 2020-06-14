const { Schema, model } = require('mongoose');

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: null
  },
  description: {
    type: String,
    required: false,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = model('tag', TagSchema);
