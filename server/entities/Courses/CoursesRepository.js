const Course = require('../../database/models').Course;

module.exports = {
    async getCourses (filter = {}) {
        const courses = await Course.find();
        return courses
    },

    async getCourse (id) {
        const courses = await Course.findById(id);
        return courses
    },

}