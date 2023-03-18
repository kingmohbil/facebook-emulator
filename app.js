require('dotenv').config();
const express = require('express');
const session = require('express-session');

const passport = require('passport');
const authRoute = require('./routes/auth-route');
const initialize = require('./passport-config');
const { connect } = require('./connect');

const app = express();
initialize(passport);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', authRoute);
app.get('/', (req, res) => {
  return res.render('home');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
  connect(process.env.DB_URL);
});
