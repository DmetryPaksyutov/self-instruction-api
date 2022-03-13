const LessonsRepository = require('./LessonsRepository');
const underscoreId = require('../../store/config').underscoreId;
const findIndexExercise = require('../../store/utils').findIndexExercise;

module.exports = {

    async getCourse  (idCourse, getProgress) {
        try {
            const lessons = await LessonsRepository.getCourse({idCourse : idCourse});
            let returnLessons = [];
            for (let i = 0; i < lessons.length; i++) {
                let lesson = {};
                lesson.name = lessons[i].name;
                lesson.description = lessons[i].description;
                lesson.img = lessons[i].img;
                lesson.id = lessons[i][underscoreId];
                lesson.exercises = [];

                if (lessons[i].exercises) {
                    for (let j = 0; j < lessons[i].exercises.length; j++) {
                        let exercise = {}
                        exercise.name = lessons[i].exercises[j].name;
                        exercise.number = lessons[i].exercises[j].number;
                        const [percent, balls] = getProgress(exercise.number);
                        exercise.percent = percent;
                        exercise.balls = balls;
                        lesson.exercises = [...lesson.exercises, exercise];
                    }
                }

                returnLessons = [...returnLessons, lesson];
            }

            return returnLessons;
        }
        catch (e) {
            console.log(e);
            return []
        }

    },

    getProgress (myCourse) {
        return (number) => {
            let percent = 0;
            let balls = 0;

            if (myCourse) {
                const index = findIndexExercise(myCourse, number);
                console.log(`index = ${index}`);
                const myExercise = myCourse.exercises[index];
                if (myExercise) {
                    console.log(myExercise);
                    percent = myExercise.percent;
                    balls = myExercise.balls;
                }
            }
            return [percent, balls];
        }
    },

    async getExercise (myCourses, idLesson, numberExercise) {
        const lesson = await LessonsRepository.getLesson(idLesson);
        const exercise = lesson.exercises[numberExercise - lesson.exercises[0].number];
        //console.log('get exercise');
        if (exercise) {
            const idCourse = lesson.idCourse;
            let returnExercise = {};
            returnExercise.name = exercise.name;
            returnExercise.number = exercise.number;
            returnExercise.theory = exercise.theory;
            returnExercise.materials = exercise.materials;
            returnExercise.words = exercise.words;
            returnExercise.maxBalls = exercise.maxBalls;

            returnExercise.balls = 0;
            returnExercise.progress = [];
            returnExercise.percent = 0;
            const statisticsExercise = this.getStatisticsExercise(myCourses, idCourse, numberExercise);
            if (statisticsExercise) {
                //console.log(`progress = ${statisticsExercise.progress}`);
                returnExercise.balls = statisticsExercise.balls;
                returnExercise.progress = statisticsExercise.progress;
                returnExercise.percent = statisticsExercise.percent;
            }
            return returnExercise;
        }
    },

    getStatisticsExercise (courses, idCourse,  numberExercise) {
        if (courses) {
            //console.log(`courses = ${courses}`);
            if (courses[idCourse]) {
               // console.log(`course = ${courses[idCourse]}`);
                const index = findIndexExercise(courses[idCourse], numberExercise);
                const exercise = courses[idCourse].exercises[index];
                //console.log(`exercise = ${exercise}`);
                if (exercise) return exercise;
            }

        }
        return null;
    }
}