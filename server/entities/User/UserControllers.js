const generateServerCode = require('../../store/utils').generateServerCode;
const UserService = require('./UserService');
const jwt = require('jsonwebtoken');
const config = require('../../store/config');
const sha256 = require('sha256');

module.exports = {
    async putStatisticsExercise (req, res) {
        try {
        const user = req.user['_doc'];
        await UserService.statisticsExercise(user, req.body);
        generateServerCode(res, 200, true);
        }
        catch (e) {
            generateServerCode(res, 500,  false, e, 'что-то пошло не так');
        }
    },

    async putUpdateDictionary (req, res) {
        try{
            const user = req.user['_doc'];
            const words = req.body.words;
            await UserService.putWordsInDictionary(words, user)
        }
        catch (e) {
            generateServerCode(res, 500,  false, e, 'что-то пошло не так');
        }
    },

    getStatisticsUser (req, res) {
        try {
            const {begin, end} = req.body;
            const user = req.user['_doc'];
            const statistics = UserService.getStatistics(begin, end, user.statistics)
            generateServerCode(res, 200,  statistics);
        }
        catch (e) {
            generateServerCode(res, 500,  null, e, 'что-то пошло не так');
        }
    },

    getWords (req, res) {
        try{
            const user = req.user['_doc'];
            const {begin, end} = req.query;
            const words = user.dictionary.slice(begin, end + 1);
            const dictionarySize = user.dictionary.length;
            generateServerCode(res, 200,  {words, dictionarySize});
        }
        catch (e) {
            generateServerCode(res, 500,  null, e, 'что-то пошло не так');
        }
    },

    async putUpdateUsername (req, res) {
        try{
            const user = req.user['_doc'];
            const {username} = req.body;
            await UserService.putUpdateValue(user, 'username', username);
            const token = jwt.sign({email, id: user[config.underscoreId]}, config.passport.secret, {
                expiresIn: 1000000,
            });
            generateServerCode(res, 200,  token);
        }
        catch (e) {
            generateServerCode(res, 500,  null, e, 'что-то пошло не так');
        }
    },

    async putUpdateEmail (req, res) {
        try{
            const user = req.user['_doc'];
            const {email} = req.body;
            await UserService.putUpdateValue(user, 'email', email);
            const token = jwt.sign({email, id: user[config.underscoreId]}, config.passport.secret, {
                expiresIn: 1000000,
            });
            generateServerCode(res, 200,  {token});
        }
        catch (e) {
            generateServerCode(res, 500,  null, e, 'что-то пошло не так');
        }
    },

    async putUpdatePassword (req, res) {
        try{
            const user = req.user['_doc'];
            const {password, newPassword} = req.body;

            const hashed = sha256(password);
            const isPasswordMatched = user.hashedPassword == hashed && true;
            if (isPasswordMatched) {
                const newHashedPassword = sha256(newPassword);
                await UserService.putUpdateValue(user, 'hashedPassword', newHashedPassword);
                const token = jwt.sign({email, id: user[config.underscoreId]}, config.passport.secret, {
                    expiresIn: 1000000,
                });
                generateServerCode(res, 200,  {token});
            }
            else  generateServerCode(res, 500,  null, {}, 'неверный пароль');


        }
        catch (e) {
            generateServerCode(res, 500,  null, e, 'что-то пошло не так');
        }
    },
}