const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const User = require('../../database/models').User;
const config = require('../../store/config');
const generateServerCode = require('../../store/utils').generateServerCode;

module.exports = {
    async registration (req, res) {

        try {
            const {username, email, password} = req.body;
            const userEmail = await User.findOne({email});
            if (!userEmail) {
                await createUser(username, email, password);

                const newUser = await User.findOne({email});
                const token = jwt.sign({email, id: newUser[config.underscoreId]}, config.passport.secret, {
                    expiresIn: 10000000,
                });

                const userToReturn = {
                    username: newUser.username,
                    avatar: newUser.avatar,
                    email: newUser.email,
                    id: newUser[config.underscoreId],
                    token,
                }
                generateServerCode(res, 200, userToReturn)
            } else {
                if (userEmail) generateServerCode(
                    res,
                    403,
                    nullData,
                    'register email error',
                    'user with this email exists already',
                    'email'
                );
            }
        } catch (e) {
            generateServerCode(res, 500, null, e, 'что-то пошло не так');
        }

    },

    async login (req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (user && user.email) {

                const newHashed = sha256(password);

                const isPasswordMatched = user.hashedPassword == newHashed && true;
                if (isPasswordMatched) {

                    const token = jwt.sign({email, id: user[config.underscoreId]}, config.passport.secret, {
                        expiresIn: 1000000,
                    });
                    console.log(`3 ${token}`);
                    const userToReturn = {
                        email: user.email,
                        username: user.username,
                        avatar: user.avatar,
                        id: user[config.underscoreId],
                        token,
                    }

                    generateServerCode(res, 200, userToReturn)
                } else {
                    generateServerCode(
                        res,
                        403,
                        null,
                        'login password error',
                        'неверен логин или пароль',
                    );
                }
            } else {
                generateServerCode(
                    res,
                    403,
                    null,
                    'login username error',
                    'неверен логин или пароль',
                );
            }
        } catch (e) {
            generateServerCode(res, 500, null, e, 'что-то пошло не так');
        }

    },

    async me (req, res) {
        const user = req.user;
        if (user) {
            let meData = {
                email: user.email,
                username: user.username,
                avatar: user.avatar,
                id: user.id,
            }
            //meData.avatar = readImage(user.avatar)
            generateServerCode(res, 200, meData);
        }
        else {
            generateServerCode(res, 500, null, req.err, 'что-то пошло не так');
        }
    },

    async logout (req, res) {
        if (req.user){
          //await User.updateOne({ username: req.user.username}, {status : false});
          generateServerCode(res, 200, {});
      }
      else {
          generateServerCode(res, 500, null, req.err, 'что-то пошло не так');
        }
    },

}

const createUser = (username, email, password) => {
    let data = {
        username,
        email,
        hashedPassword : sha256(password),
        avatar : '',
        courses : {},
        statistics : {},
        dictionary : [],
    }
    return new User(data).save();
}
