const Lesson = require('../../database/models').Lesson;
const generateServerCode = require('../../store/utils').generateServerCode;
const LessonsService = require('./LessonsService');


module.exports = {

    async getCourse (req, res)  {
        try {
            const idCourse =  req.query.id;
            let returnLessons = await LessonsService.getCourse(idCourse, () => [0, 0]);

            const courseData = {
                lessons : returnLessons,
                tests : [],
            }
            generateServerCode(res, 200, courseData);
        }
        catch (e) {
            generateServerCode(res, 500, {}, e, 'что-то пошло не так');
        }
    },

    async getAuthCourse (req, res) {
        try {
            const user = req.user;
            const idCourse =  req.query.id;

            let myCourse = false
            if (user['_doc'].courses.length) {
                myCourse = user.courses.find ( (course) => {
                    if (course.id == idCourse)  return true } );
            }
           // console.log(user);
            const setProgress = LessonsService.setProgress(myCourse);
            let returnLessons = await LessonsService.getCourse(idCourse, setProgress);


            const courseData = {
                lessons : returnLessons,
                tests : [],
            }

            generateServerCode(res, 200, courseData);
        }
        catch (e) {
            generateServerCode(res, 500, {}, e, 'что-то пошло не так');
        }
    },

    async createTestLessons (req, res) {
        const lessons = [
            {
                name : 'Глагол to be - Present Simple (настоящее простое), единственное число',
                idCourse : '61fdfc6abc9e215d73034dd3',
                description : 'Короткие фразы с глаголом to be в форме единственного числа настоящего времени.',
                img : 'https://avatars.yandex.net/get-music-content/193823/cf763a3c.a.8560627-1/m1000x1000?webp=false',
                exercises : [
                    {
                        name : 'Я есть',
                        number : 1,
                        words : [],
                        materials : [],
                    },
                    {
                        name : 'Он есть',
                        number : 2,
                        words : [],
                        materials : [],
                    },
                    {
                        name : 'Она есть',
                        number : 3,
                        words : [],
                        materials : [],
                    },
                    {
                        name : 'Я не ...',
                        number : 4,
                        words : [],
                        materials : [],
                    },
                ],
            },
            {
                name : 'Глагол to be - Present Simple (настоящее простое), множественное число',
                idCourse : '61fdfc6abc9e215d73034dd3',
                description : 'Короткие фразы с глаголом to be в форме множественного числа настоящего времени.',
                img : 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612568278_90-p-fon-zelenie-kvadrati-152.jpg',
                exercises : [
                    {
                        name : 'Мы есть',
                        number : 5,
                        words : [],
                        materials : [],
                    },
                ],
            },
        ]

        await Lesson(lessons[0]).save();
        await Lesson(lessons[1]).save();
        res.send('add lessons');
    },

    test (req, res) {
        res.send('test');
    }
}
