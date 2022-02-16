const config = {
    passport: {
        secret: 'sec',
        expiresIn: 10000,
    },
    env: {
        port: 8080,
        mongoDBUri: 'mongodb+srv://',
        mongoHostName:  '',
    },
    underscoreId : '_id',
};

module.exports = config;