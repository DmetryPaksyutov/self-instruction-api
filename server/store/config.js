const config = {
    passport: {
        secret: 'node.js_sample_secret_key_1fsd154',
        expiresIn: 10000,
    },
    env: {
        port: 8080,
        mongoDBUri: 'mongodb+srv://dema:dema123123@cluster0.cd1u3.mongodb.net/self-instruction?retryWrites=true&w=majority',
        mongoHostName:  '',
    },
    underscoreId : '_id',
};

module.exports = config;