const express = require('express');
const auth = require('../../store/utils').auth;
const CoursesControllers = require('./CoursesControllers');

const CoursesRouter = express.Router();

CoursesRouter.get('/courses', CoursesControllers.getAllCourses);
CoursesRouter.get('/authCourses', auth, CoursesControllers.getAuthAllCourses);

CoursesRouter.get('/createTestCourse', CoursesControllers.createTestCourse);
CoursesRouter.get('/test', CoursesControllers.test);

module.exports = CoursesRouter;