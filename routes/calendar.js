// How to use: After selecting classes in th Course Selection Menu, click on Send to Google Calendar.
// Google Calendar will open, asking to allow access to post to Calendar.
// Paste into the command line for the backend.
// A token will be created, which will be used to authenticate after.
// Events should be created, check the week of September 2nd, 2019.

// To do: Parse properly instead of sending it constantly to September 2nd.
// Set the first occurance of an event to the correct date instead of always the monday.
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

router.use(bodyParser.json())

var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
var opn = require('opn');

const SCOPES = ['https://www.googleapis.com/auth/calendar',
			'https://www.googleapis.com/auth/calendar.events'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

router.post('/', function(req, res, next) {
	console.log('POST req received');
	console.log(req.body);
	var parsedJSON = req.body.courseArray;
	console.log("This is temp: ");
	console.log(parsedJSON);
	// Load client secrets from a local file.
	fs.readFile('credentials.json', (err, content) => {
	  if (err) return console.log('Error loading client secret file:', err);
	  // Authorize a client with credentials, then call the Google Calendar API.
	  authorize(JSON.parse(content), insertEvents);
	});
	
	function authorize(credentials, callback) {
	  const {client_secret, client_id, redirect_uris} = credentials.installed;
	  const oAuth2Client = new google.auth.OAuth2(
		  client_id, client_secret, redirect_uris[0]);

	  // Check if we have previously stored a token.
	  fs.readFile(TOKEN_PATH, (err, token) => {
		if (err) return getAccessToken(oAuth2Client, callback);
		oAuth2Client.setCredentials(JSON.parse(token));
		callback(oAuth2Client);
	  });
	}
	
	function getAccessToken(oAuth2Client, callback) {
	  const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	  });
	  opn(authUrl);
	  //console.log('Authorize this app by visiting this url:', authUrl);
	  const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	  });
	  rl.question('Enter the code from that page here: ', (code) => {
		rl.close();
		oAuth2Client.getToken(code, (err, token) => {
		  if (err) return console.error('Error retrieving access token', err);
		  oAuth2Client.setCredentials(token);
		  // Store the token to disk for later program executions
		  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
			if (err) return console.error(err);
			console.log('Token stored to', TOKEN_PATH);
		  });
		  callback(oAuth2Client);
		});
	  });
	}

	function insertEvents(auth) {
	  const calendar = google.calendar({ version: 'v3', auth });
	  var digit = 0;  
	  for (item in parsedJSON){
		//console.log(parsedJSON[item]);
		digit++;
		var lab = false;
		var eventName;
		var tutorialName;
		var labName;
		var yearCourse = '';
		var monthCourse = '';
		var dayCourse = '';
		var dayTutorial = '';
		var dayLab = '';
		var firstDayCourse = '';
		var firstDayTutorial = '';
		var firstDayLab = '';
		var startTimeCourse;
		var startTimeTutorial;
		var startTimeLab;
		var endTimeCourse;
		var endTimeTutorial;
		var endTimeLab; 
		var repetitionsCourse = 0;
		var repetitionsTutorial = 0;
		var repetitionsLab = 0;
		var semester = '';
		var section = parsedJSON[item][1];
		var tutorial = parsedJSON[item][2];
		var lab = parsedJSON[item][3];
		for (a in parsedJSON[item][0]){
			//console.log(parsedJSON[item][0][a]);
			if (a == "course"){
				eventName = parsedJSON[item][0][a];
				tutorialName = parsedJSON[item][0][a] + " Tutorial";
				labName = parsedJSON[item][0][a] + " Lab";
			}
			if (a == "name")
				eventName += ":" + parsedJSON[item][0][a];
			if (a == "semester")
				semester = parsedJSON[item][0][a];
			if (a == "lecture"){
				for (b in parsedJSON[item][0][a][section]){
					if (b == "section")
						eventName += " " + parsedJSON[item][0][a][section][b];
					if (b == "days"){
						if (parsedJSON[item][0][a][section][b][0] == "Monday")
							firstDayCourse = "02";
						else if (parsedJSON[item][0][a][section][b][0] == "Tuesday")
							firstDayCourse = "03";
						else if (parsedJSON[item][0][a][section][b][0] == "Wednesday")
							firstDayCourse = "04";
						else if (parsedJSON[item][0][a][section][b][0] == "Thursday")
							firstDayCourse = "05";
						else if (parsedJSON[item][0][a][section][b][0] == "Friday")
							firstDayCourse = "06";
						for (c in parsedJSON[item][0][a][section][b]){
							dayCourse += parsedJSON[item][0][a][section][b][c].substring(0, 2) + ",";
							repetitionsCourse++;
						}
						dayCourse = dayCourse.substring(0, dayCourse.length - 1);
						dayCourse = dayCourse.toUpperCase();
					}
					if (b == "room")
						eventName += " " + parsedJSON[item][0][a][section][b];
					if (b == "startTime")
						startTimeCourse = parsedJSON[item][0][a][section][b];
					if (b == "endTime")
						endTimeCourse = parsedJSON[item][0][a][section][b];
					if (b == "tutorial")
					{
						var tut = parsedJSON[item][0][a][section][b][tutorial];
						tutorialName += " " + tut.section;
						for (c in tut.days){
							if (tut.days[0] == "Monday")
								firstDayTutorial = "02";
							else if (tut.days[0] == "Tuesday")
								firstDayTutorial = "03";
							else if (tut.days[0] == "Wednesday")
								firstDayTutorial = "04";
							else if (tut.days[0] == "Thursday")
								firstDayTutorial = "05";
							else if (tut.days[0] == "Friday")
								firstDayTutorial = "06";
							dayTutorial += tut.days[c].substring(0, 2) + ",";
							repetitionsTutorial++;
						}
						dayTutorial = dayTutorial.substring(0, dayTutorial.length - 1);
						dayTutorial = dayTutorial.toUpperCase();
						tutorialName += " " + tut.room;
						startTimeTutorial = tut.startTime;
						endTimeTutorial = tut.endTime;
						console.log(tut);
						/*for (c in parsedJSON[item][0][a][section][b][tutorial]){
							console.log(parsedJSON[item][0][a][section][b][tutorial]);
							if (c = "section")
								tutorialName += " " + parsedJSON[item][0][a][section][b][tutorial][c];
							if (c == "days"){
								for (d in parsedJSON[item][0][a][section][b][tutorial][c]){
									console.log(dayTutorial);
									dayTutorial += parsedJSON[item][0][a][section][b][tutorial][c][d].substring(0, 2) + ",";
									repetitionsTutorial++;
								}
								dayTutorial = dayTutorial.substring(0, dayTutorial.length - 1);
								dayTutorial = dayTutorial.toUpperCase();
							}		
							if (c == "room")
								tutorialName += " " + parsedJSON[item][0][a][section][b][tutorial][c];
							if (c == "startTime")
								startTimeTutorial = parsedJSON[item][0][a][section][b][tutorial][c];
							if (c == "endTime")
								endTimeTutorial = parsedJSON[item][0][a][section][b][tutorial][c];
						}*/
					}
					}
				}
			if (a == "lab"){
				for (b in parsedJSON[item][0][a][lab]){
					if (b == "section")
						labName += " " + parsedJSON[item][0][a][lab][b];
					if (b == "days"){
						if (parsedJSON[item][0][a][section][b][0] == "Monday")
							firstDayLab = "02";
						else if (parsedJSON[item][0][a][section][b][0] == "Tuesday")
							firstDayLab = "03";
						else if (parsedJSON[item][0][a][section][b][0] == "Wednesday")
							firstDayLab = "04";
						else if (parsedJSON[item][0][a][section][b][0] == "Thursday")
							firstDayLab = "05";
						else if (parsedJSON[item][0][a][section][b][0] == "Friday")
							firstDayLab = "06";
						for (c in parsedJSON[item][0][a][lab][b]){
							dayLab += parsedJSON[item][0][a][lab][b][c].substring(0, 2) + ",";
							repetitionsLab++;
						}
						dayLab = dayLab.substring(0, dayLab.length - 1);
						dayLab = dayLab.toUpperCase();
					}
					if (b == "room")
						labName += " " + parsedJSON[item][0][a][lab][b];
					if (b == "startTime")
						startTimeLab = parsedJSON[item][0][a][lab][b];
					if (b == "endTime")
						endTimeLab = parsedJSON[item][0][a][lab][b];
					}
				}
		}
		// Will need to be changed to get Year.
		
		
		var eventCourse = {
				summary: eventName,
				start: {
				  dateTime: '2019-09-'+firstDayCourse+'T' + startTimeCourse + ':00-04:00',
				  timeZone: 'America/New_York'
				},
				end: {
				  dateTime: '2019-09-'+firstDayCourse+'T' + endTimeCourse + ':00-04:00',
				  timeZone: 'America/New_York'
				},
				recurrence: ['RRULE:FREQ=WEEKLY;BYDAY='+dayCourse+';COUNT='+13*repetitionsCourse],
				colorId: [digit]
			}
			console.log(eventCourse);
			var eventTutorial = {
				summary: tutorialName,
				start: {
				  dateTime: '2019-09-'+firstDayTutorial+'T' + startTimeTutorial + ':00-04:00',
				  timeZone: 'America/New_York'
				},
				end: {
				  dateTime: '2019-09-'+firstDayTutorial+'T' + endTimeTutorial + ':00-04:00',
				  timeZone: 'America/New_York'
				},
				recurrence: ['RRULE:FREQ=WEEKLY;BYDAY='+dayTutorial+';COUNT='+13*repetitionsTutorial],
				colorId: [digit]
			}
			console.log(eventTutorial);	
			var eventLab = {
					summary: labName,
					start: {
					  dateTime: '2019-09-'+firstDayLab+'T' + startTimeLab + ':00-04:00',
					  timeZone: 'America/New_York'
					},
					end: {
					  dateTime: '2019-09-'+firstDayLab+'T' + endTimeLab + ':00-04:00',
					  timeZone: 'America/New_York'
					},
					recurrence: ['RRULE:FREQ=WEEKLY;BYDAY='+dayLab+';COUNT='+13*repetitionsLab],
					colorId: [digit]
				}
			console.log(eventLab);	
			calendar.events.insert(
				{
				  auth: auth,
				  calendarId: 'primary',
				  resource: eventCourse
				},
				function(err, eventCourse) {
				  if (err) {
					console.log(
					  'There was an error contacting the Calendar service: ' + err
					);
					return;
				  }
				  console.log('Event created: %s', eventCourse.data.htmlLink);
				}
			);
			calendar.events.insert(
				{
				  auth: auth,
				  calendarId: 'primary',
				  resource: eventTutorial
				},
				function(err, eventTutorial) {
				  if (err) {
					console.log(
					  'There was an error contacting the Calendar service: ' + err
					);
					return;
				  }
				  console.log('Event created: %s', eventTutorial.data.htmlLink);
				}
			);
			calendar.events.insert(
				{
				  auth: auth,
				  calendarId: 'primary',
				  resource: eventLab
				},
				function(err, eventLab) {
				  if (err) {
					console.log(
					  'There was an error contacting the Calendar service: ' + err
					);
					return;
				  }
				  console.log('Event created: %s', eventLab.data.htmlLink);
				}
			);
	    }
	}
});

module.exports = router;
