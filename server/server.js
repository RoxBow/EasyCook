require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const RateLimit = require('express-rate-limit');
const LocalStrategy = require('./passport.config').PassportLocalStrategy;
const JwtStrategy = require('./passport.config').PassportJwtStrategy;

const { mainRouter } = require('./routes/main.router');

const goodDeals = require('./mocks/goodDeals.json');
const ingredients = require('./mocks/ingredients.json');
const calendar = require('./mocks/calendar.json');
const shoppingLists = require('./mocks/shoppingLists.json');

/* # MODELS # */
const User = require('./models/User.js');

/*
  Add this line before express' response to set CORS header:
  res.header("Access-Control-Allow-Origin", "*");
*/

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

const db = mongoose.connection;

// security (limit number request)
// const apiLimiter = new RateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 2000,
//   delayMs: 0 // disabled
// });

// stop all next request from 150
// app.use('/', apiLimiter);

// configure cors
app.use(cors());

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Config bodyParser
app.use(bodyParser.json({ limit: '50mb', extended: true })); // For parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
  })
); // for parsing application/x-www-form-urlencoded

app.use('/assets', express.static(path.join(__dirname, 'assets')));

//=> Router
app.use('/', mainRouter);

db.on('error', console.error.bind(console, 'Error connect database'));
db.once('open', () => !console.log('Connected to database'));

//=> Passport Strategy
passport.use(LocalStrategy);
passport.use(JwtStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).exec((err, user) => {
    done(err, user);
  });
});

/* # fetch data # */

app.get('/goodDeals', (req, res) => {
  res.json(goodDeals);
});

app.get('/ingredients', (req, res) => {
  res.json(ingredients);
});

app.get('/calendar', (req, res) => {
  res.json(calendar);
});

app.get('/shoppingLists', (req, res) => {
  res.json(shoppingLists);
});

app.get('/shoppingLists/:id', (req, res) => {
  // req.params.id
  res.json(shoppingLists);
});

app.listen(process.env.PORT, () => {
  console.log(`Serveur running on ${process.env.PORT}`);
});
