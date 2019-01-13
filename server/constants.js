
const { ExtractJwt } = require('passport-jwt');

const jwtSecret = {
  secret: 'jwt-secret'
};

const optionsJwtStrategy = {};
optionsJwtStrategy.jwtFromRequest = ExtractJwt.fromBodyField('token');
optionsJwtStrategy.secretOrKey = jwtSecret;
optionsJwtStrategy.issuer = 'accounts.examplesoft.com';
optionsJwtStrategy.audience = 'yoursite.net';

module.exports = { jwtSecret, optionsJwtStrategy };
