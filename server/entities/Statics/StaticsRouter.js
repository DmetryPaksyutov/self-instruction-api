const express = require('express');
const StaticsControllers = require('./StaticsControllers');

const StaticsRouter = express.Router();

StaticsRouter.get('/audioProposal', StaticsControllers.getAudioProposal);
StaticsRouter.get('/audioWord', StaticsControllers.getAudioWords);
StaticsRouter.get('/theory/:fileName', StaticsControllers.getTheory)

module.exports = StaticsRouter;