const passport = require('passport');

const generateServerCode = (res, code, data, fullError = '', msg = '', location = 'server') => {
    const errors= {
        location,
        fullError,
        msg,
    };

    return res.status(code).json({
        code,
        data,
        fullError,
        errors,
    });
}

let auth = passport.authenticate('jwt', { session: false });

module.exports = {
    generateServerCode,
    auth,
}