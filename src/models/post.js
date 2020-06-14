const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'user',
    required: true,
    index: true
  },
  description: {
    type: String,
    required: false,
    default: null
  },
  channel: {
    type: Schema.ObjectId,
    ref: 'channel',
    required: true,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

PostSchema.plugin(mongoosePaginate);

module.exports = model('post', PostSchema);
