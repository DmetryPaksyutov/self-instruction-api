const express = require('express');
const auth = require('../../store/utils').auth;
const AuthControllers = require('./AuthorizationControllers');

const AuthRouter = express.Router();

AuthRouter.post('/registration',  AuthControllers.registration);
AuthRouter.post('/login', AuthControllers.login);
AuthRouter.get('/me', auth, AuthControllers.me);
AuthRouter.get('/logout', auth, AuthControllers.logout);

AuthRouter.get('/test1', auth, (req, res) => {
    res.json({msd: 'авторизовыный запрос'})
});

module.exports = AuthRouter;