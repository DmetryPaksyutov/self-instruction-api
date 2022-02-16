const Lesson = require('../../database/models').Lesson;

module.exports = {
    async getCourse (filter = {}) {
        const lessons = await Lesson.find(filter);
        return lessons;
    },

}