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
                course.progress = setProgress(course.id);
                returnCourses = [...returnCourses, course];
            }
            return returnCourses;
        }
        catch (e) {
            console.log(e);
        }
    },

    setProgress(userCourses) {
        return (id) => {
            let myCourse = false;
            if (userCourses && userCourses.length) myCourse = userCourses.find((courseItem) => {
                if (courseItem[underscoreId] == id) {
                    return true
                }
            });
            if (myCourse) return myCourse.progress;
            return 0;
        }
    }
}