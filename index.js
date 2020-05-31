const fs = require('fs');
const config = require('./config/config.js');
const untisManager = require('./managers/UntisManager.js');
const googleCalendarManager = require('./managers/GoogleCalendarManager.js');

// Load google client secrets from a local file.
fs.readFile('./config/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);

    // Authorize a client with credentials, then call the Google Calendar API.
    googleCalendarManager.authorize(JSON.parse(content), (auth) => {

        googleCalendarManager.clearCalendar(auth);

        // get the user data from the untis api
        untisManager.getUserData().then((userData) => {
            // just fetch data from defined weeks in the config
            var elementNumber2 = 0;

            config.FETCH_TIME_PERIOD.forEach(currentWeek => {
                // timeout for not getting rate limited by google / webuntis
                setTimeout(() => {
                    // fetch timetable for the current week
                    untisManager.getTimeTable(currentWeek.startDate, currentWeek.endDate).then((timeTable) => {
                        // all lessons from the requested time period
                        const lessons = timeTable.result.timetable.periods;

                        var elementNumber = 0;

                        lessons.forEach(lesson => {
                            // additional information about the lesson (subject, teacher, room, ...)
                            const lessonData = lesson.elements;

                            var subject;
                            var teacherName = '';
                            var roomName;

                            if (lesson.is[0] === "REGULAR" || lesson.is[1] === "REGULAR") {
                                lessonData.forEach(element => {
                                    switch (element.type) {
                                        case 'SUBJECT':
                                            subject = untisManager.getSubjectById(userData, element.id);
                                            break;
                                        case 'TEACHER':
                                            try {
                                                var id = 0;

                                                if (element.id === 0) {
                                                    if (element.orgId !== 0) {
                                                        id = element.orgId;
                                                    } else {
                                                        id = element.id;
                                                    }
                                                } else if (element.orgId === 0) {
                                                    if (element.id !== 0) {
                                                        id = element.id;
                                                    } else {
                                                        id = element.id;
                                                    }
                                                } else {
                                                    id = element.id;
                                                }

                                                var teacher = untisManager.getTeacherById(userData, id);
                                                teacherName = teacher.firstName + " " + teacher.lastName + " (" + teacher.name + ")";
                                            } catch (error) {
                                                console.log(element);
                                            }
                                            break;
                                        case 'ROOM':
                                            roomName = untisManager.getRoomById(userData, element.id).name;
                                            break;
                                        default:
                                            break;
                                    }
                                });

                                setTimeout(() => {
                                    googleCalendarManager.createEvent(auth, subject.name, subject.longName, roomName, teacherName, lesson.startDateTime.replace('Z', ':00'), lesson.endDateTime.replace('Z', ':00'), 'primary');
                                }, 1500 + (elementNumber * 800));

                                elementNumber++;
                            }
                            if (lesson.is[0] === "EXAM") {
                                const exam = lesson.exam;

                                lessonData.forEach(element => {
                                    switch (element.type) {
                                        case 'SUBJECT':
                                            subject = untisManager.getSubjectById(userData, element.id);
                                            break;
                                        case 'TEACHER':
                                            try {
                                                teacherName = untisManager.getTeacherById(userData, element.orgId).name;
                                            } catch (error) {
                                                console.log(element);
                                            }
                                            break;
                                        case 'ROOM':
                                            roomName = untisManager.getRoomById(userData, element.id).name;
                                            break;
                                        default:
                                            break;
                                    }
                                });

                                setTimeout(() => {
                                    googleCalendarManager.createEvent(auth, subject.name + ' ' + exam.examtype, subject.longName, roomName, teacherName, lesson.startDateTime.replace('Z', ':00'), lesson.endDateTime.replace('Z', ':00'), '31shl7f1me1k4ebdhic1699voc@group.calendar.google.com');
                                }, 1500 + (elementNumber * 800));

                                elementNumber++;
                            }
                        });
                    })
                }, 1500 + (elementNumber2 * 20000));

                elementNumber2++;
            });
        });
    });
});