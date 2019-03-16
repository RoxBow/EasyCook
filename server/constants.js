if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const KindExtractJwt = require('passport-jwt').ExtractJwt;

const optionsJwtStrategy = {
  jwtFromRequest: KindExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = { optionsJwtStrategy };
