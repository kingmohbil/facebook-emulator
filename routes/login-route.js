const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  if (req.user) return res.redirect('/');
  return res.render('login');
});

module.exports = router;
