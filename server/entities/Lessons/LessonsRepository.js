const Lesson = require('../../database/models').Lesson;

module.exports = {
    async getCourse (filter = {}) {
        try {
            return await Lesson.find(filter);

        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async getLesson (id) {
        try {
            return await Lesson.findById(id);
        }
        catch (e) {
            throw e;
        }
    },

}