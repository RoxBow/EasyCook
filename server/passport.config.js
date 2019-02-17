const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const optionsJwtStrategy = require('./constants').optionsJwtStrategy;
const User = require('./models/User.js');

const unSelectedFieldsUser = '-__v'
const PassportLocalStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  (email, password, done) => {
    User.findOne({ email })
      .populate('avatar')
      .select(unSelectedFieldsUser).exec((err, user) => {
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
);

const PassportJwtStrategy = new JwtStrategy(optionsJwtStrategy, (jwt_payload, done) => {
  User.findOne({ username: jwt_payload.id })
    .populate('avatar')
    .select(unSelectedFieldsUser)
    .exec((err, user) => {
      if (err) {
        console.log('Erreur identification avec le token');
        return;
      }

      if (user) {
        return done(null, user);
      }
    });
});

module.exports = {
  PassportLocalStrategy,
  PassportJwtStrategy
};
