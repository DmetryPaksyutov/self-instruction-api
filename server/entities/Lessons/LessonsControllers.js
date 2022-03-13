const Lesson = require('../../database/models').Lesson;
const generateServerCode = require('../../store/utils').generateServerCode;
const LessonsService = require('./LessonsService');
const getNameCourse = require('../Courses/CoursesService').getNameCourse;


module.exports = {

    async getCourse (req, res)  {
        try {
            const idCourse =  req.query.id;
            let returnLessons = await LessonsService.getCourse(idCourse, () => [0, 0]);

            const name = await getNameCourse(idCourse);
            const courseData = {
                name,
                lessons : returnLessons,
                tests : [],
            }
            generateServerCode(res, 200, courseData);
        }
        catch (e) {
            generateServerCode(res, 500, null, e, 'что-то пошло не так');
        }
    },

    async getAuthCourse (req, res) {
        try {
            const user = req.user['_doc'];
            const idCourse =  req.query.id;
            const myCourse = user.courses[idCourse]

           console.log(user);
            console.log(myCourse);
            const getProgress = LessonsService.getProgress(myCourse);
            let returnLessons = await LessonsService.getCourse(idCourse, getProgress);

            const name = await getNameCourse(idCourse);
            const courseData = {
                name,
                lessons : returnLessons,
                tests : [],
            }

            generateServerCode(res, 200, courseData);
        }
        catch (e) {
            generateServerCode(res, 500, null, e, 'что-то пошло не так');
        }
    },

    async getExercise (req, res) {
        try {
            const idLesson = req.query.id;
            const numberExercise = req.query.number;
            const user = req.user['_doc'];
            //console.log(user.courses);
            const exercise = await LessonsService.getExercise(user.courses, idLesson, numberExercise);
            generateServerCode(res, 200, exercise);
        }
        catch (e) {
            generateServerCode(res, 500, null, e, 'что-то пошло не так');
        }

    },

}
