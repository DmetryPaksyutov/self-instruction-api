const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    name : String,
    idCourse : String,
    description : String,
    exercises : Array,
    img : String,
}, { versionKey: false });

const Lesson = mongoose.model('Lesson', LessonSchema);
module.exports = Lesson;