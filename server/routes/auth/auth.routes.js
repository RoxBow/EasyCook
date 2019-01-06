/*
Imports
*/
    const express = require('express');
    const authRouter = express.Router({ mergeParams: true });
//

/*
Routes definition
*/
    class AuthRouterClass {
        routes(){
            // HATEOAS
            authRouter.get('/', (req, res) => {
                res.json('HATEOAS for auth');
            });
            
            // Register
            authRouter.post('/register', (req, res) => {
                console.log('register');
            });

            // Login
            authRouter.post('/login', (req, res) => {
                console.log('register');
            });
        };

        init(){
            this.routes();
            return authRouter;
        }
    }
//

/*
Export
*/
    module.exports = AuthRouterClass;
//