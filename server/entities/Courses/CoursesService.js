const CoursesRepository = require('./CoursesRepository');
const underscoreId = require('../../store/config').underscoreId;

module.exports = {
    async getCourses (setProgress) {
        try {
            const courses = await CoursesRepository.getCourses();
            let returnCourses = [];
            for (let i = 0; i < courses.length; i++) {
                const course = {};
                course.id = courses[i][underscoreId];
                course.category = courses[i].category;
                course.description = courses[i].description;
                course.img = courses[i].img;
                course.name =  courses[i].name;
                course.percent = setProgress(course.id);
                returnCourses = [...returnCourses, course];
            }
            return returnCourses;
        }
        catch (e) {
            console.log(e);
        }
    },

    setProgress(userCourses) {
        return (idCourse) => {
            let myCourse;
            if (userCourses[idCourse]) myCourse = userCourses[idCourse];
            if (myCourse) return myCourse.percent;
            return 0;
        }
    },

    async getNameCourse (id) {
        const course = await CoursesRepository.getCourse(id);
        const name = course.name;
        return name;
    }
}