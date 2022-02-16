const express = require('express');
const auth = require('../../store/utils').auth;
const LessonsControllers = require('./LessonsControllers');

const LessonsRouter = express.Router();

LessonsRouter.get('/course', LessonsControllers.getCourse);
LessonsRouter.get('/authCourse', auth, LessonsControllers.getAuthCourse);

LessonsRouter.get('/test', LessonsControllers.test);
LessonsRouter.get('/createTestLessons', LessonsControllers.createTestLessons);

module.exports = LessonsRouter;