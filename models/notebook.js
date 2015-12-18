'use strict';
module.exports = function(sequelize, DataTypes) {
  var notebook = sequelize.define('notebook', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    goodreads_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.notebook.belongsTo(models.user);
        models.notebook.hasMany(models.note);
      }
    }
  });
  return notebook;
};