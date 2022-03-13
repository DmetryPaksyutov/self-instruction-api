const UserRepository = require('./UserRepository');
const CoursesRepository = require('../Courses/CoursesRepository');
const LessonRepository = require('../Lessons/LessonsRepository');
const underscoreId = require('../../store/config').underscoreId;
const findIndexExercise = require('../../store/utils').findIndexExercise;

module.exports = {
    async statisticsExercise (user, body) {

        const {idLesson, numberExercise, progress, balls, minutes} = body;
        const lesson = await LessonRepository.getLesson(idLesson);

        const idCourse = lesson.idCourse;
        let myCourse = user.courses[idCourse];
        if (!myCourse) {
            myCourse = {
                doneExercises : 0,
                percent : 0,
                exercises : []
            }
        }
        const indexExercise = findIndexExercise(myCourse, numberExercise)
        //console.log(myCourse);
        //console.log(`indexExercise = ${indexExercise}`);


        const isReplay = (user.courses[idCourse]?.exercises[indexExercise]?.percent === 100)
        //console.log(`isReplay = ${isReplay}`)

        let percent;
        if (!isReplay)
            percent = countPercentExercise(progress);
        else percent = 100;
        //console.log(`percent = ${percent}`);

        const prevBalls = (indexExercise !== -1) ? user.courses[idCourse].exercises[indexExercise].balls : 0;
        //console.log(prevBalls);
        const statistics = updateStatistics(user.statistics, minutes, isReplay, balls - prevBalls, percent);

        //console.log(statistics);

        const course = await updateCourse(myCourse, idCourse, indexExercise, percent, balls, progress, isReplay, numberExercise);
        const newCourses = {...user.courses}
        newCourses[idCourse] = course;
        //console.log(newCourses);

        await UserRepository.updateUserWork(user[underscoreId], newCourses, statistics)
    },

    async putWordsInDictionary (words, user) {
        let dictionary = [...user.dictionary];
        //console.log(dictionary);
        words.forEach((word) => {
            const index = dictionary.findIndex((wordDictionary) => wordDictionary.proposal === word.proposal);
            if (index === -1) {
                dictionary.push(word);
            }
        })
        await UserRepository.updateDictionary(user[underscoreId], dictionary)
    },

    getStatistics (begin, end, statistics) {
        let maxDays = new Date(begin.year, begin.month, 0).getDate();
        let {year, month, day} = begin;
        let data = [];
        //console.log(statistics);
        //console.log(`${year}, ${month}, ${day}`);
        //console.log(`${end.year}, ${end.month}, ${end.day}`);
        while (year <= end.year && month <= end.month && day <= end.day) {

            const dayStr = (day < 10) ? `0${day}` : day;
            const monthStr = (month < 10) ? `0${month}` : month;
            const dateStr = `${dayStr}.${monthStr}.${year}`
            const statisticDay = statistics[dateStr];
            //console.log(`date = ${dateStr}`);
            //console.log(statisticDay);
            if (statisticDay) data.push(statisticDay)
            else data.push(null);

            day++;
            if (day > maxDays) {
                month++;
                day = 1;
                if (month < 13) maxDays = new Date(year, month, day).getDate();
            }
            if (month > 12) {
                year++;
                month = 1;
                maxDays = new Date(year, month, day).getDate();
            }
        }
        //console.log(data);
        return data;
    },

    async putUpdateValue (user, key, value) {
        const data = {
            [key] : value
        }

        await UserRepository.updateValue(user[underscoreId], data);
    }

}

const countPercentExercise = (progress) => {
    const maxPercent = progress[0].length + progress[1].length * 3;
    let tecPercent = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < progress[i].length; j++) {
            if (progress[i][j] == 'yes') tecPercent ++;
        }
    }
    let percent = 0;
    if (tecPercent > 0) percent = Math.round(tecPercent * 100 / maxPercent);
    return percent;
}

const updateCourse = async (myCourse,
                             idCourse,
                             indexExercise,
                             percent,
                             balls,
                             progress,
                             isReplay,
                            numberExercise
                            ) => {

    if (percent === 100 && !isReplay) {
        //console.log('c p 1');
        const course = await CoursesRepository.getCourse(idCourse);
        //console.log('c p 2');
        const numberExercises = course.numberExercises;
        //console.log(`numberExercise = ${numberExercises}`)
        myCourse.doneExercises++;
        //console.log(`doneEx = ${myCourse.doneExercises}`)
        myCourse.percent = myCourse.doneExercises * 100 / numberExercises;
        //console.log(`percent myCourse = ${myCourse.percent}`)
    }
    //console.log('c 2');
    if (indexExercise !== -1) {
        myCourse.exercises[indexExercise].balls = balls;
        myCourse.exercises[indexExercise].percent = percent;
        myCourse.exercises[indexExercise].progress = progress;
        //console.log('c 3');
    }
    else {
       // console.log('c 4');
        let exercise = {
            balls,
            percent,
            progress,
            number : numberExercise,
        }
        //console.log(exercise);
        myCourse.exercises.push(exercise);
        if ( myCourse.exercises.length > 0) myCourse.exercises.sort((a, b) => a.number - b.number);
    }
    //console.log(myCourse);
    return myCourse;
}

const updateStatistics = (userStatistics, minutes, isReplay, balls, percent) => {
    let statistics =  {...userStatistics};
    const date = new Date().toLocaleDateString();
    //console.log('s 1');
    if (statistics[date]) {
        statistics[date].time += minutes;
        statistics[date].balls += balls;
       // console.log('s 2');
    }
    else {
        statistics[date] = {
            time : minutes,
            balls : balls,
            passedExercises : 0,
        }
      //  console.log('s 3');
    }
   // console.log('s 4');
    if (percent === 100 && !isReplay) statistics[date].passedExercises ++;
    //console.log('s 5');
    //console.log(statistics);
    return statistics;
}