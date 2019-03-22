// Run by calling cmd then node calendar.json
// Delete token.json in ordere to test google api authentication

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
var parsedJSON = JSON.parse(fs.readFileSync("schedule.json", "utf8"));
const opn = require('opn');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar',
			'https://www.googleapis.com/auth/calendar.events'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), insertEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
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

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
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
	for (a in parsedJSON[item]){
		//console.log(a);
		if (a == "course")
			eventName = parsedJSON[item][a];
		if (a == "name")
			eventName += ":" + parsedJSON[item][a];
		if (a == "startTime"){
			startTimeCourse = parsedJSON[item][a];
			//console.log(startTimeCourse)
		}
		if (a == "endTime"){
			endTimeCourse = parsedJSON[item][a];
			//console.log(endTimeCourse)
		}
		if (a == "days") {
			for (b in parsedJSON[item][a]){
				dayCourse += parsedJSON[item][a][b].substring(0, 2) + ",";
				repetitionsCourse++;
			}
			dayCourse = dayCourse.substring(0, dayCourse.length - 1);
			dayCourse = dayCourse.toUpperCase();
			//console.log(dayCourse);
		}
		if (a == "ta") {
			for (b in parsedJSON[item][a]){
				for (c in parsedJSON[item][a][b]){
					if (c == "type"){
						if (parsedJSON[item][a][b][c] == "Lab")
							lab = true;
						console.log(lab);
					}
					if (c == "days") {
						for (d in parsedJSON[item][a][b][c]){
							if (lab == false){
								dayTutorial += parsedJSON[item][a][b][c][d].substring(0, 2) + ",";
								repetitionsTutorial++;
							}
							else{
								dayLab += parsedJSON[item][a][b][c][d].substring(0, 2) + ",";
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
							startTimeTutorial = parsedJSON[item][a][b][c];
							console.log(startTimeTutorial);
						}
						else
							startTimeLab = parsedJSON[item][a][b][c];
					}
					if (c == "endTime"){
						if (lab == false)
							endTimeTutorial = parsedJSON[item][a][b][c];
						else
							endTimeLab = parsedJSON[item][a][b][c];
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

//System Ddate through computer.
//Button, get information from back end


// Move stuff to routes folder
// Start Page. see how button is doing to refresh time and copy to semester page
// When button is hit, it will call a function that grabs all the information from the diffrtn parts of the pagee to send to googl.
// messag rubiat, ali, to look on front end where it grabbed
// Call andre
