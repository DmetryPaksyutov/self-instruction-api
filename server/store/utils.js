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

const findIndexExercise = (course, numberExercise) => {
    //console.log(course);
    //console.log(`numberExercise = ${numberExercise}`);
    if (course) {
        const index = course.exercises.findIndex((exercise) => exercise.number == numberExercise);
        console.log(`find : index = ${index}`);
        if (index !== -1) return index;
    }
    return -1;

}

module.exports = {
    generateServerCode,
    auth,
    findIndexExercise,
}

