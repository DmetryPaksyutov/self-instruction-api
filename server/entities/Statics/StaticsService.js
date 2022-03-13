const fs = require('fs');

module.exports = {
    getAudio (res, audioName, dir) {
        const filePath =  `${__dirname}/statics/audio/${dir}/${audioName}`;
        res.set('content-type', 'audio/mp3');
        res.set('accept-ranges', 'bytes');
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    },

    getHTML (fileName) {

    }
}