const express = require('express');
const router = express.Router();

router.get('/', checkIfLoggedIn, (req, res) => {
  console.log(`The User: ${req.user}`);
  return res.render('home', { userPicture: req.user.profile.picture });
});

module.exports = router;

function checkIfLoggedIn(req, res, next) {
  if (!req.user) return res.redirect('/login');
  return next();
}
