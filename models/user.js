'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    netname: {
			type: DataTypes.STRING,
			primaryKey: true,
			field: 'netname'
		},
    password: DataTypes.STRING
  }, {
		tableName: "account user",
		timestamps: false
	});
  User.associate = function(models) {
    // associations can be defined here
  };
	/*
	User.sync({force: false}).then(() => {
			return User.create({
				netname: 'user',
				password: 'pass'
			});
	});
	User.validPassword = function(password) {
		console.log('pass from user', password);
		return password == this.password;
	};
	*/
  return User;
};

