'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    netname: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
		timestamps: false
	});
  User.associate = function(models) {
    // associations can be defined here
  };

    User.sync({force: true}).then(() => {
        return User.create({
            username: 'John'
        });
    });
  return User;
};

