var LocalStrategy = require('passport-local').Strategy;


module.exports = function(passport, sequelize) {
	const User = sequelize.import('./models/user');

	passport.use(new LocalStrategy({
			usernameField: 'netname'
		}, function(netname, password, done) {
			User.findOne({
				where: { netname: netname }
			})
			.then(function(user, err) {
				if (!user) { return done(null, false); } // invalid usernmae
				//if (!user.validPassword(password)) { // invalid password
				if (password != 'pass') { // invalid pass (static for now)
					return done(null, false, { message: 'Incorrect password.' });
				}
				return done(null, user);
			})
			.catch(err => done(err)); // error of some sort
		}
	));

	passport.serializeUser(function(user, done) {
		console.log('Serialized!');
		return done(null, user.netname);
	});

	passport.deserializeUser(function(netname, done) {
		console.log('Deserialized!');
		User.findOne({
			where: { netname: netname }
		})
		.then(function(user, err) {
			done(err, user);
		});
	});
};
