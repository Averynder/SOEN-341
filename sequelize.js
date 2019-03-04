var Sequelize = require('sequelize');
const config = require('./config/config.json');

const sequelize = new Sequelize(
	config.development.database,
	config.development.username,
	config.development.password,
	{
		host: config.development.host,
		dialect: config.development.dialect,
		operatorsAliases: config.development.operatorsAliases,
	}
);

sequelize
	.authenticate()
	.then(() => {
			console.log("Connection works");
	})
	.catch(err => {
			console.log('Unable to connect!', err);
	})

module.exports = sequelize;
