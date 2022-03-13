const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name : { type: String, require: true},
    img : String,
    description : { type: String, require: true},
    category : String,
    numberExercises : Number,

}, { versionKey: false });

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;