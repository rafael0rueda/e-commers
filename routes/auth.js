const express = require('express');
const router = express.Router();

const AuthService = require('../services/AuthService');
const AuthServiceIntance = new AuthService();

module.exports = (app, passport) => {

    app.use('/auth', router);

    //User registration Endpoint
    router.post('/register', async (req, res, next) => {
        try {
            const data = req.body;

            const response = await AuthServiceIntance.register(data);
            res.status.send(response);

        } catch (err) {
            next(err);
        }
    });

    //User Login endpoint
    router.post('/login', passport.authenticate('local'), async (req, res, next) =>{
        try {
            const { username, password } = req.body;
            const response = await AuthServiceIntance.login({ email: username, password: password});

            res.status.send(response);

        } catch (err) {
            next(err);
        }
    });
}