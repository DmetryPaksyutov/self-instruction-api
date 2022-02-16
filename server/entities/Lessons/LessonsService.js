const LessonsRepository = require('./LessonsRepository');
const underscoreId = require('../../store/config').underscoreId;

module.exports = {

    async getCourse  (idCourse, setProgress) {
        try {
            const lessons = await LessonsRepository.getCourse(); //idCourse : idCourse
            let returnLessons = [];
            for (let i = 0; i < lessons.length; i++) {
                let lesson = {};
                lesson.name = lessons[i].name;
                lesson.description = lessons[i].description;
                lesson.id = lessons[i][underscoreId];
                lesson.exercises = [];

                if (lessons[i].exercises) {
                    for (let j = 0; j < lessons[i].exercises.length; j++) {
                        let exercise = {}
                        exercise.name = lessons[i].exercises[j].name;
                        exercise.number = lessons[i].exercises[j].number;
                        exercise.id = lessons[i].exercises[j][underscoreId];
                        const [progress, balls] = setProgress(exercise.id);
                        exercise.progress = progress;
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

    setProgress (myCourse) {
        return (id) => {
            let progress = 0;
            let balls = 0;

            if (myCourse) {
                const myExercise = myCourse.lessons.exercises.find((lessonItem) => {
                    if (lessonItem.id == id) return true
                });
                if (myExercise) {
                    progress = myExercise.progress;
                    balls = myExercise.balls;
                }
            }
            return [progress, balls];
        }
    },
}