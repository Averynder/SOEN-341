var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());

/* GET Cookie listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([{
  	id: 1,
  	username: JSON.stringify(req.cookies.cookieID)//._cookieID)
  }, {
  	id: 2,
  	username: "lol"
  }]);
  next();
});

module.exports = router;
