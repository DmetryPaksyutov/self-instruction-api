const passportJWT = require('passport-jwt');
const config = require('./config');
const User = require('../database/models/index').User;

const applyPassportStrategy = passport => {
    const options = {};
    options.jwtFromRequest = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    //console.log(options.jwtFromRequest);
    options.secretOrKey = config.passport.secret;
    passport.use(
        new passportJWT.Strategy(options, (payload, done) => {
            User.findOne({ email: payload.email }, (err, userData) => {
                if (err) {
                    return done(err, false);
                }
                if (userData) {
                    let user = {...userData};
                    user.id = userData[config.underscoreId];
                    delete user[config.underscoreId];

                    return done(null, user);
                }
                return done(null, false);
            });
        })
    );
};

module.exports = applyPassportStrategy;