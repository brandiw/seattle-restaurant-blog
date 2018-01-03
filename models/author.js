'use strict';
module.exports = function(sequelize, DataTypes) {
  var author = sequelize.define('author', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    bio: DataTypes.TEXT,
    dob: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.author.hasMany(models.article);
      }
    }
  });
  return author;
};
