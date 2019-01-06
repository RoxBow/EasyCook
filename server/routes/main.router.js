const { Router } = require('express');
const AuthRouterClass = require('./auth/auth.routes');

/* Define routers */
const mainRouter = Router({ mergeParams: true });
const apiRouter = Router({ mergeParams: true });

const authRouter = new AuthRouterClass();


/* Define routes */
mainRouter.use('/api', apiRouter);
apiRouter.use('/auth', authRouter.init());

module.exports = { mainRouter };