const express = require('express');
const passport = require('passport');
const AuthRouterClass = require('./auth/auth.routes');
const UserRouterClass = require('./user/user.routes');

/* Routers */
const mainRouter = express.Router({ mergeParams: true });
const apiRouter = express.Router({ mergeParams: true });

const authRouter = new AuthRouterClass();
const userRouter = new UserRouterClass();

/* Routes */
mainRouter.use('/api', apiRouter);
apiRouter.use('/auth', authRouter.init());
apiRouter.use('/user', passport.authenticate('jwt', { session: false }), userRouter.init());

module.exports = { mainRouter };
