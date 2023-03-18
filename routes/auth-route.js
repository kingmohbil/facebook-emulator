const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email', 'user_location', 'user_friends'],
  })
);

router.get(
  '/auth/facebook/redirect',
  passport.authenticate('facebook'),
  (req, res) => {
    return res.send('You reached the callback URL');
  }
);

module.exports = router;
