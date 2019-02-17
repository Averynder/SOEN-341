'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING
  }, {});
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

