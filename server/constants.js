const KindExtractJwt = require('passport-jwt').ExtractJwt;

const jwtSecret = {
  secret: 'jwt-secret'
};

const optionsJwtStrategy = {};
optionsJwtStrategy.jwtFromRequest = KindExtractJwt.fromAuthHeaderAsBearerToken();
optionsJwtStrategy.secretOrKey = jwtSecret.secret;


module.exports = { jwtSecret, optionsJwtStrategy };
