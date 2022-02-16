const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const User = require('../../database/models').User;
const config = require('../../store/config');
const generateServerCode = require('../../store/utils').generateServerCode;

const nullData = {
    avatar: '',
    email: '',
    id: '',
    token: '',
    username: '',
}

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
            generateServerCode(res, 500, nullData, e, 'что-то пошло не так');
        }

    },

    async login (req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (user && user.email) {

                //const isPasswordMatched = user.comparePassword(password);
                const newHashed = sha256(password);

                const isPasswordMatched = user.hashedPassword == newHashed && true;

                if (isPasswordMatched) {

                    const token = jwt.sign({email, id: user[config.underscoreId]}, config.passport.secret, {
                        expiresIn: 1000000,
                    });
                    //const userToReturn = { ...user.toJSON(), ...{ token } };
                    const userToReturn = {
                        email: user.email,
                        username: user.username,
                        avatar: user.avatar,
                        id: user[config.underscoreId],
                        token,
                    }
                    //delete userToReturn.hashedPassword;
                    //res.status(200).json(userToReturn);
                    await User.updateOne({email}, {status: true});
                    generateServerCode(res, 200, userToReturn)
                } else {
                    generateServerCode(
                        res,
                        403,
                        nullData,
                        'login password error',
                        'неверен логин или пароль',
                    );
                }
            } else {
                generateServerCode(
                    res,
                    403,
                    nullData,
                    'login username error',
                    'неверен логин или пароль',
                );
            }
        } catch (e) {
            generateServerCode(res, 500, nullData, e, 'что-то пошло не так');
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
            meData.avatar = readImage(user.avatar)
            generateServerCode(res, 200, meData);
        }
        else {
            generateServerCode(res, 500, nullData, req.err, 'что-то пошло не так');
        }
    },

    async logout (req, res) {
        if (req.user){
          //await User.updateOne({ username: req.user.username}, {status : false});
          generateServerCode(res, 200, {});
      }
      else {
          generateServerCode(res, 500, nullData, req.err, 'что-то пошло не так');
        }
    },

}

const createUser = (username, email, password) => {
    let now = new Date().toLocaleString().slice(0, 10)

    let data = {
        username,
        email,
        hashedPassword : sha256(password),
        avatar : '',
        courses : [],
        statistics : [],
        points : 0,
        time : 0,
        lessons : 0,
    }
    return new User(data).save();
}

const updateInfo = async (req, res, queryType) => {
    const queryData = req.body[queryType]
    if (!queryData) {
        generateServerCode(res, 400, null, 'not query', 'нет параметра');
    }
    else {
        try {
            const user = await User.findById(req.user.id);
            const newInfo = user.info;
            newInfo[queryType] = queryData;
            await User.updateOne({username : req.user.username}, {info : newInfo});
            generateServerCode(res, 200, null);
        }
        catch (err) {
            generateServerCode(res, 500, null, err, 'что-то пошло не так');
        }
    }
}
