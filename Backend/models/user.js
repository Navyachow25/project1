const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  image: String
});

module.exports = mongoose.model('users', UserSchema);