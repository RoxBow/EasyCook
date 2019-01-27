const express = require('express');
const passport = require('passport');

const AuthRouterClass = require('./auth/auth.routes');
const UserRouterClass = require('./user/user.routes');
const ShoppingListRouterClass = require('./user/shoppingList.routes');
const EventRouterClass = require('./user/event.routes');

/* Routers */
const mainRouter = express.Router({ mergeParams: true });
const apiRouter = express.Router({ mergeParams: true });

const authRouter = new AuthRouterClass();
const userRouter = new UserRouterClass();
const shoppingListRouter = new ShoppingListRouterClass();
const eventRouter = new EventRouterClass();

/* Routes */
mainRouter.use('/api', apiRouter);
apiRouter.use('/auth', authRouter.init());

apiRouter.use('/user', passport.authenticate('jwt', { session: false }), userRouter.init());
apiRouter.use('/user/shoppingList', passport.authenticate('jwt', { session: false }), shoppingListRouter.init());
apiRouter.use('/event', passport.authenticate('jwt', { session: false }), eventRouter.init());

module.exports = { mainRouter };
