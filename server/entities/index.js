const AuthRouter = require('./Authorization/AuthorizationRouter');
const CoursesRouter = require('./Courses/CoursesRouter');
const LessonsRouter = require('./Lessons/LessonsRouter');
const UserRouter = require('./User/UserRouter');
const StaticsRouter = require('./Statics/StaticsRouter');

module.exports = {
    AuthRouter,
    CoursesRouter,
    LessonsRouter,
    UserRouter,
    StaticsRouter,
}