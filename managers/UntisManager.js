const fs = require('fs');
const config = require('../config/config.js');
const fetch = require('node-fetch');
const otp = require('otplib/authenticator');
otp.options = { crypto: require('crypto') };

/**
 * Requests all user data from the untis api
 */
async function getUserData() {
    const url = config.USER_DATA.URL + '/WebUntis/jsonrpc_intern.do?school=' + config.USER_DATA.SCHOOL;
    const time = new Date().getTime();
    const otpToken = otp.generate(config.USER_DATA.KEY);

    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
            id: 0,
            method: 'getUserData2017',
            params: [
                {
                    auth: {
                        clientTime: time,
                        user: config.USER_DATA.USER,
                        otp: otpToken
                    }
                }
            ],
            jsonrpc: '2.0'
        })
    })
        .then(res => res.json());

    return response;
}

/**
 * Get data for a specific timetable
 * @param {*} startDate 
 * @param {*} endDate 
 */
async function getTimeTable(startDate, endDate) {

    const url = config.USER_DATA.URL + '/WebUntis/jsonrpc_intern.do?school=' + config.USER_DATA.SCHOOL;
    const time = new Date().getTime();
    const otpToken = otp.generate(config.USER_DATA.KEY);

    var date = new Date();

    var currentWeekDay = date.getDay();
    var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
    var weekStart = new Date(new Date(date).setDate(date.getDate() - lessDays));
    var weekEnd = new Date(new Date(weekStart).setDate(weekStart.getDate() + 6));

    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
            id: 0,
            method: 'getTimetable2017',
            params: [
                {
                    id: '1378',
                    type: 'STUDENT',
                    startDate: startDate, //'2019-10-07',
                    endDate: endDate, //'2019-10-11', 
                    masterDataTimestamp: time,
                    auth: {
                        clientTime: time,
                        user: config.USER_DATA.USER,
                        otp: otpToken
                    }
                }
            ],
            jsonrpc: '2.0'
        })
    }).then(res => res.json());

    return response;
}


function getSubjectById(userData, subjectId) {
    const subjects = userData.result.masterData.subjects;
    var result = null;

    subjects.forEach(subject => {
        if (subject.id == subjectId) {
            result = subject;
        }
    });

    return result;
}

function getTeacherById(userData, teacherId) {
    const teachers = userData.result.masterData.teachers;
    var result = null;

    teachers.forEach(teacher => {
        if (teacher.id == teacherId) {
            result = teacher;
        }
    });

    return result;
}

function getRoomById(userData, roomId) {

    if (roomId == 0) {
        return {
            name: 'R3IT'
        }
    }

    var result = null;
    const rooms = userData.result.masterData.rooms;

    rooms.forEach(room => {
        if (room.id == roomId) {
            result = room;
        }
    });

    return result;
}
module.exports = { getTimeTable, getUserData, getSubjectById, getTeacherById, getRoomById };