const { Schema, model } = require('mongoose');

const RegionSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, { timestamps: true });

module.exports = model('region', RegionSchema);
