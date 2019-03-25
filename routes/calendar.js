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
var app = express();

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
	console.log(req);
	
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
	  for (item in req.body){
		digit++;
		var lab = false;
		var eventName;
		var yearCourse = '';
		var monthCourse = '';
		var dayCourse = '';
		var dayTutorial = '';
		var dayLab = '';
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
		for (a in req.body[item]){
			//console.log(a);
			if (a == "course")
				eventName = req.body[item][a];
			if (a == "name")
				eventName += ":" + req.body[item][a];
			if (a == "startTime"){
				startTimeCourse = req.body[item][a];
				//console.log(startTimeCourse)
			}
			if (a == "endTime"){
				endTimeCourse = req.body[item][a];
				//console.log(endTimeCourse)
			}
			if (a == "days") {
				for (b in req.body[item][a]){
					dayCourse += req.body[item][a][b].substring(0, 2) + ",";
					repetitionsCourse++;
				}
				dayCourse = dayCourse.substring(0, dayCourse.length - 1);
				dayCourse = dayCourse.toUpperCase();
				//console.log(dayCourse);
			}
			if (a == "semester")
				semester = req.body[item][a];
			if (a == "ta") {
				for (b in req.body[item][a]){
					for (c in req.body[item][a][b]){
						if (c == "type"){
							if (req.body[item][a][b][c] == "Lab")
								lab = true;
							console.log(lab);
						}
						if (c == "days") {
							for (d in req.body[item][a][b][c]){
								if (lab == false){
									dayTutorial += req.body[item][a][b][c][d].substring(0, 2) + ",";
									repetitionsTutorial++;
								}
								else{
									dayLab += req.body[item][a][b][c][d].substring(0, 2) + ",";
									repetitionsLab++;
								}
								if (lab == false){
									dayTutorial = dayTutorial.substring(0, dayTutorial.length - 1);
									dayTutorial = dayTutorial.toUpperCase();
								}
								else{
									dayLab = dayLab.substring(0, dayLab.length - 1);
									dayLab = dayLab.toUpperCase();
								}
							}
						}
						if (c == "startTime"){
							if (lab == false){
								startTimeTutorial = req.body[item][a][b][c];
								console.log(startTimeTutorial);
							}
							else
								startTimeLab = req.body[item][a][b][c];
						}
						if (c == "endTime"){
							if (lab == false)
								endTimeTutorial = req.body[item][a][b][c];
							else
								endTimeLab = req.body[item][a][b][c];
						}
					}
				}
			}
		}	
		var eventCourse = {
			summary: eventName,
			start: {
			  dateTime: '2019-09-02T' + startTimeCourse + ':00-04:00',
			  timeZone: 'America/New_York'
			},
			end: {
			  dateTime: '2019-09-02T' + endTimeCourse + ':00-04:00',
			  timeZone: 'America/New_York'
			},
			recurrence: ['RRULE:FREQ=WEEKLY;BYDAY='+dayCourse+';COUNT='+13*repetitionsCourse],
			colorId: [digit]
		}
		console.log(eventCourse);
		var eventTutorial = {
			summary: eventName + " Tutorial",
			start: {
			  dateTime: '2019-09-02T' + startTimeTutorial + ':00-04:00',
			  timeZone: 'America/New_York'
			},
			end: {
			  dateTime: '2019-09-02T' + endTimeTutorial + ':00-04:00',
			  timeZone: 'America/New_York'
			},
			recurrence: ['RRULE:FREQ=WEEKLY;BYDAY='+dayTutorial+';COUNT='+13*repetitionsTutorial],
			colorId: [digit]
		}
		console.log(eventTutorial);
		if (lab == true){
			var eventLab = {
				summary: eventName + " Lab",
				start: {
				  dateTime: '2019-09-02T' + startTimeLab + ':00-04:00',
				  timeZone: 'America/New_York'
				},
				end: {
				  dateTime: '2019-09-02T' + endTimeLab + ':00-04:00',
				  timeZone: 'America/New_York'
				},
				recurrence: ['RRULE:FREQ=WEEKLY;BYDAY='+dayLab+';COUNT='+13*repetitionsLab],
				colorId: [digit]
			}
			console.log(eventLab);
		}
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
		if (lab == true){
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
	}
});

module.exports = router;
