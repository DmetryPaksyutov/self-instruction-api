const User = require('../../database/models/user.model');

module.exports = {
    async updateUserWork (idUser, courses, statistics) {
        try{
            return await User.updateOne({_id : idUser}, {courses, statistics});
        }
        catch (e) {
            console.log(e);
        }
    },

    async updateDictionary (idUser, dictionary) {
        try {
            return await User.updateOne({_id : idUser}, {dictionary});
        }
        catch (e) {
            console.log(e);
        }
    },

    async updateValue (idUser, update) {
        try {
            return await User.updateOne({_id : idUser}, update);
        }
        catch (e) {
            console.log(e);
        }
    },
}