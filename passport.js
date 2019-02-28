var LocalStrategy = require('passport-local').Strategy;


module.exports = function(passport, sequelize) {
	const User = sequelize.import('./models/user');

	passport.use(new LocalStrategy({
			usernameField: 'netname'
		}, function(netname, password, done) {
			User.findOne({
				where: {
					netname: netname,
					password: password
				}
			})
			.then(function(user, err) {
				if (err) return done(err);

				if (!user) return done(null, false);
				//if (!user.validPassword(password)) {
				if (user.password != 'pass') {
					return done(null, false, { message: 'Incorrect password.' });
				}

				return done(null, user);
			})
			.catch(err => done(err));
		}
	));

	passport.serializeUser(function(users, done) {
		console.log('Users serialized!');
		return done(null, users);
	});

	passport.deserializeUser(function(id, done) {
		console.log('Users serialized!');
		return done(null, users);
	});
};
