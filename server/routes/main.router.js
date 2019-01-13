const express = require('express');
const AuthRouterClass = require('./auth/auth.routes');

/* Define routers */
const mainRouter = express.Router({ mergeParams: true });
const apiRouter = express.Router({ mergeParams: true });

const authRouter = new AuthRouterClass();


/* Define routes */
mainRouter.use('/api', apiRouter);
apiRouter.use('/auth', authRouter.init());

module.exports = { mainRouter };