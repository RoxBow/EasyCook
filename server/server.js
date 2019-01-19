require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const optionsJwtStrategy = require('./constants').optionsJwtStrategy;
const RateLimit = require('express-rate-limit');

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
const apiLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2000,
  delayMs: 0 // disabled
});

// stop all next request from 150
app.use('/', apiLimiter);

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
app.use(bodyParser.json()); // For parsing application/json
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
db.once('open', () => {
  console.log('Connected to database');
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) => {
      User.findOne({ email })
        .populate('shoppingList')
        .exec((err, user) => {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }

          if (!user.validPassword(password, user.password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }

          return done(null, user);
        });
    }
  )
);

passport.use(
  new JwtStrategy(optionsJwtStrategy, (jwt_payload, done) => {
    User.findOne({ username: jwt_payload.id })
      .populate('shoppingList')
      .exec((err, user) => {
        if (err) {
          console.log('Erreur identification avec le token');
          return;
        }

        if (user) {
          return done(null, user);
        }
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .populate('shoppingList')
    .exec((err, user) => {
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
