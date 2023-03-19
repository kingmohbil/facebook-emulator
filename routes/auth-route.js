const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'user_photos'],
  })
);

router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

module.exports = router;
