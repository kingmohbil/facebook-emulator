const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  profile: {
    picture: String,
  },
  username: String,
  facebookId: String,
});

module.exports = mongoose.model('users', userSchema);
