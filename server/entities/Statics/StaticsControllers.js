const StaticsService = require('./StaticsService');
const fs = require('fs');

module.exports = {
    getAudioProposal (req, res) {
        const audioName = req.query.audioName;
        StaticsService.getAudio(res, audioName, 'proposals');

    },

    getAudioWords (req, res) {
        const audioName = req.query.audioName;
        StaticsService.getAudio(res, audioName, 'words');
    },

    getTheory (req, res) {
        const fileName = req.params.fileName;
        const filePath =  `${__dirname}/statics/html/${fileName}`;
        res.sendFile(filePath);
    }
}