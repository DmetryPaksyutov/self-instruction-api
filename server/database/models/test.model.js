const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({

}, { versionKey: false });

const Test = mongoose.model('Test', TestSchema);
module.exports = Test;