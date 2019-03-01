'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    netname: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
		tableName: "account user",
		timestamps: false
	});
  User.associate = function(models) {
    // associations can be defined here
  };
	User.sync({force: false}).then(() => {
			return User.create({
				netname: 'user',
				password: 'pass'
			});
	});
  return User;
};

