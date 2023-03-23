const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  profile: {
    picture: String,
  },
  posts: [],
  username: String,
  facebookId: String,
});

module.exports = mongoose.model('users', userSchema);
