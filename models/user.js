'use strict';

var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var uid=0;

var userSchema = new Schema({
  id: { type: Number, default: 0 },
  username: { type: String, unique: 'Username already exists', required: 'Please fill in a username', lowercase: true, trim: true },
  password: { type: String, default: '' },
  salt: { type: String },
  profileImageURL: { type: String, default: 'public/images/users/default.png' },
  updated: { type: Date },
  created: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }
  this.id = uid++;
  next();
});

userSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
  } else {
    return password;
  }
};

userSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};


module.exports = mongoose.model('user', userSchema);
