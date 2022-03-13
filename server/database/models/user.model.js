const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sha256 = require('sha256');

const UserSchema = new Schema({
    username : { type: String, require: true},
    hashedPassword : { type: String, require: true},
    email : { type: String, require: true},
    avatarImg : String,
    courses : Object,
    statistics : Object,
    dictionary : Array,

}, { versionKey: false });

UserSchema.methods.comparePassword = (password) => this.hashedPassword == sha256(password);

const User = mongoose.model('User', UserSchema);
module.exports = User;

/*
courses = [ { id, progress, lessons : [ { id, balls, progress} ] }]
 */