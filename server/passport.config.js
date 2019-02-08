const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const optionsJwtStrategy = require('./constants').optionsJwtStrategy;
const User = require('./models/User.js');

const fieldsWanted = 'email username bio lastConnection password'

const PassportLocalStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  (email, password, done) => {
    User.findOne({ email }).populate('avatar')
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

        // marche pas
        delete user.password;
        return done(null, user);
      });
  }
);

const PassportJwtStrategy = new JwtStrategy(optionsJwtStrategy, (jwt_payload, done) => {
  User.findOne({ username: jwt_payload.id }).populate('avatar')
    .exec((err, user) => {
      if (err) {
        console.log('Erreur identification avec le token');
        return;
      }

      if (user) {
        delete user.password;
        return done(null, user);
      }
    });
});

module.exports = {
  PassportLocalStrategy,
  PassportJwtStrategy
};
