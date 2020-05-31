<h1 align="center">Welcome to webuntis-fetcher 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/mikenussbaumer/webuntis-fetcher#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/mikenussbaumer/webuntis-fetcher/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/mikenussbaumer/webuntis-fetcher/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/mikenussbaumer/webuntis-fetcher" />
  </a>
</p>

> Used for fetching timetable data from webuntis and creating appropriate google events for the lessons

### 🏠 [Homepage](https://github.com/mikenussbaumer/webuntis-fetcher#readme)

## Install

1. Do step one on [this](https://developers.google.com/calendar/quickstart/nodejs) tutorial to get the `credentials.json` file
2. Move the downloaded `credentials.json` file into the config folder
3. Run `npm install` to install all node dependencies
4. Configure the `config.js` file
   * Access data for the webuntis API (can be found in the popup where you can scan the qr code for the mobile app access)
   * Add timeperiods in weeks (max 5 days) with the start and end date of the week as shown in the example configuration
   * Create an calendar in the google calendar webinterface for exams
   * Change the exam calendar id in the config to the id of the created calendar in the [webinterface](https://docs.simplecalendar.io/find-google-calendar-id/) from google calendar
5. Run `npm start` to start the fetcher
6. Visit the link provided in the console and authorize your google account with the nodejs app
7. Paste the code you get from google in the console
8. Enjoy your lessons in your google calendar :)


## Usage

* `npm run start` to clear all lessons from the google calendar and to add the newly fetched ones

## Author

👤 **Mike Nussbaumer**

* E-Mail: dev@mike-nussbaumer.com
* Github: [@mikenussbaumer](https://github.com/mikenussbaumer)
* LinkedIn: [@mike-nußbaumer](https://linkedin.com/in/mike-nußbaumer)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mikenussbaumer/webuntis-fetcher/issues). You can also take a look at the [contributing guide]( ).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Mike Nussbaumer](https://github.com/mikenussbaumer).<br />
This project is [MIT](https://github.com/mikenussbaumer/webuntis-fetcher/blob/master/LICENSE) licensed.