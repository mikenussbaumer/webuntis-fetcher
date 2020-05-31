'use strict';

module.exports = {
    // get this information from the webuntis dashboard (on the panel where you can scan a qr code)
    USER_DATA: {
        SCHOOL_NUMBER: '12345',
        SCHOOL: 'xxxxx',
        URL: 'https://erato.webuntis.com', // e.g https://erato.webuntis.com
        USER: 'xxxxx',
        KEY: 'xxx123xxxx'
    },
    // timeperiod to fetch the lessons from
    FETCH_TIME_PERIOD: [{
        startDate: '2020-06-01',
        endDate: '2020-06-05'
    },
    {
        startDate: '2020-06-08',
        endDate: '2020-06-12'
    },
    {
        startDate: '2020-06-15',
        endDate: '2020-06-19'
    },
    {
        startDate: '2020-06-22',
        endDate: '2020-06-26'
    },
    {
        startDate: '2020-06-29',
        endDate: '2020-07-03'
    },
    {
        startDate: '2020-07-06',
        endDate: '2020-07-10'
    }
    ],
    // google api calendar id's for the primary lessons and for exams
    GOOGLE_CALENDAR: {
        NORMAL_LESSONS_CALENDARID: 'primary',
        EXAMS_CALENDARID: 'xxxxxxxxxxxxxxxxxx@group.calendar.google.com'
    }
}