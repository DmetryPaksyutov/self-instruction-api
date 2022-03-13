const express = require('express');
const UserControllers = require('./UserControllers');
const auth = require('../../store/utils').auth;

const UserRouter = express.Router();

UserRouter.put('/updateStatistic', auth, UserControllers.putStatisticsExercise);
UserRouter.put('/updateDictionary', auth, UserControllers.putUpdateDictionary);
UserRouter.post('/statistics', auth, UserControllers.getStatisticsUser);
UserRouter.get('/dictionary', auth, UserControllers.getWords);
UserRouter.put('/username', auth, UserControllers.putUpdateUsername);
UserRouter.put('/email', auth, UserControllers.putUpdateEmail);
UserRouter.put('/password', auth, UserControllers.putUpdatePassword);

module.exports = UserRouter;