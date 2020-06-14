const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ChannelSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: null
  },
  description: {
    type: String,
    required: true,
    default: null
  },
  tags: [{
    type: Schema.ObjectId,
    ref: 'tag',
    required: false,
    index: true
  }],
  users: [{
    type: Schema.ObjectId,
    ref: 'user',
    index: true
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

ChannelSchema.plugin(mongoosePaginate);

module.exports = model('channel', ChannelSchema);
