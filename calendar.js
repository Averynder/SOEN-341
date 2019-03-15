const {google} = require('googleapis');
const privatekey =  ("CSSD-Service-Account.json");
const calendar = google.calendar('v3');

let jwtClient = new google.auth.JWT(
	privatekey.client_email,
	null,
	privatekey.private_key,
	['https://www.googleapis.com/auth/calendar',
	'https://www.googleapis.com/auth/calendar.events']
);

jwtClient.authorize(function (err, tokens) {
	if (err){
		console.log(err);
		return
	} else {
		console.log("Successfully connected!");
	}
}; 

function addEvents(auth, calendar) addEvents(calendar){
	calendar.events.insert({
		auth: jwtClient,
		calendarId: 'primary',
		rsource: {
			// This part has to be changed to pull from the classes being taken.
			// The whole calendar.events.insert will probably be a loop iterating
			// through the taken classes.
			'summary': 'Event'.
			'description': 'Description',
			 'start' {
				'dateTime': '2011-06-03T10:00:00.000-07:00',
				'timeZone': 'America/New_York'
			  },
			  'end': {
				'dateTime': '2011-06-03T10:25:00.000-07:00',
				'timeZone': 'America/New_York'
			  },
			  'recurrence': [
				'RRULE:FREQ=WEEKLY;UNTIL=20110701T170000Z',
			  ],
}

calendar.events.list({
   auth: jwtClient,
   calendarId: 'primary'
}, function (err, response) {
   if (err) {
       console.log('The API returned an error: ' + err);
       return;
   }
   var events = response.items;
   if (events.length == 0) {
       console.log('No events found.');
   } else {
       console.log('Event from Google Calendar:');
       for (let event of response.items) {
           console.log('Event name: %s, Creator name: %s, Create date: %s', event.summary, event.creator.displayName, event.start.date);
       }
   }
});

var event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2015-05-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'},
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};

/*
calendar.events.insert({
  auth: auth,
  calendarId: 'primary',
  resource: event,
}, function(err, event) {
  if (err) {
    console.log('There was an error contacting the Calendar service: ' + err);
    return;
  }
  console.log('Event created: %s', event.htmlLink);
});*/

	