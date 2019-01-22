const KindExtractJwt = require('passport-jwt').ExtractJwt;

const jwtSecret = {
  secret: 'jwt-secret'
};

const optionsJwtStrategy = {
  jwtFromRequest: KindExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret.secret
};

module.exports = { jwtSecret, optionsJwtStrategy };
