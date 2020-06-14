const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: false,
    default: null
  },
  region: {
    type: Schema.ObjectId,
    ref: 'region',
    required: true,
    index: true
  },
  token: {
    type: String,
    required: false,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
  next();
  return true;
});

UserSchema.methods.comparePassword = async function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.encryptPassword = async function encryptPassword(password) {
  return bcrypt.hashSync(password, SALT_WORK_FACTOR);
};

module.exports = model('user', UserSchema);
