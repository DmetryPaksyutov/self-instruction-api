const Course = require('../../database/models').Course;
const generateServerCode = require('../../store/utils').generateServerCode;
const CoursesService = require('./CoursesService');


module.exports = {
    async getAllCourses (req, res)  {
        try {
            const courses = await CoursesService.getCourses(() => 0);
            generateServerCode(res, 200, courses);
        }
        catch {
            generateServerCode(res, 500, {}, e, 'что-то пошло не так');
        }
    },

    async getAuthAllCourses (req, res) {
        try {
            const user = req.user;
            const setProgress = CoursesService.setProgress(user.courses)
            const courses = await CoursesService.getCourses(setProgress);

            generateServerCode(res, 200, courses);
        }
        catch {
            generateServerCode(res, 500, {}, e, 'что-то пошло не так');
        }
    },

    //https://sun6-23.userapi.com/s/v1/if1/SFfeeKHvBhzq056ujMI83U2c_H4h_2Xu8R1f4slIZ73ApPkM4T2A7O5fjgcSJkLvJmEcnNaK.jpg?size=50x50&quality=96&crop=17,0,697,697&ava=1
    async createTestCourse (req, res) {
        const course = {
            name : 'С нуля - Beginner',
            img : Buffer,
            description : 'По мере прохождения курса вы научитесь понимать, читать и писать простые фразы и предложения',
            category : 'Англиский по уровням',
        }
        Course(course).save();
        res.send('add course');
    },

    test (req, res) {
        res.send('test');
    }

}
