const express = require('express');
const auth = require('../../store/utils').auth;
const LessonsControllers = require('./LessonsControllers');

const LessonsRouter = express.Router();

LessonsRouter.get('/course', LessonsControllers.getCourse);
LessonsRouter.get('/authCourse', auth, LessonsControllers.getAuthCourse);
LessonsRouter.get('/exercise', auth, LessonsControllers.getExercise);

module.exports = LessonsRouter;