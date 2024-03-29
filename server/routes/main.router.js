const express = require('express');
const passport = require('passport');

const AuthRouterClass = require('./auth/auth.routes');
const UserRouterClass = require('./user/user.routes');
const ShoppingListRouterClass = require('./shoppingList/shoppingList.routes');
const EventRouterClass = require('./event/event.routes');
const GoodDealRouterClass = require('./goodDeal/goodDeal.routes');
const RecipeRouterClass = require('./recipe/recipe.routes');
const CalendarRouterClass = require('./calendar/calendar.routes');

/* Routers */
const mainRouter = express.Router({ mergeParams: true });
const apiRouter = express.Router({ mergeParams: true });

const authRouter = new AuthRouterClass();
const userRouter = new UserRouterClass();
const shoppingListRouter = new ShoppingListRouterClass();
const eventRouter = new EventRouterClass();
const goodDealRouter = new GoodDealRouterClass();
const recipeRouter = new RecipeRouterClass();
const calendarRouter = new CalendarRouterClass();

/* Routes */
mainRouter.use('/api', apiRouter);
apiRouter.use('/auth', authRouter.init());

apiRouter.use('/user', passport.authenticate('jwt', { session: false }), userRouter.init());
apiRouter.use('/shoppingList', passport.authenticate('jwt', { session: false }), shoppingListRouter.init());
apiRouter.use('/event', passport.authenticate('jwt', { session: false }), eventRouter.init());
apiRouter.use('/goodDeal', passport.authenticate('jwt', { session: false }), goodDealRouter.init());
apiRouter.use('/recipe', passport.authenticate('jwt', { session: false }), recipeRouter.init());
apiRouter.use('/calendar', passport.authenticate('jwt', { session: false }), calendarRouter.init());

module.exports = { mainRouter };
