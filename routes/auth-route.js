const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use(protect);
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'user_posts'],
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

function protect(req, res, next) {
  if (!req.user) return next();
  return res.redirect('/');
}
