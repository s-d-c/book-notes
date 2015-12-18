'use strict';
module.exports = function(sequelize, DataTypes) {
  var note = sequelize.define('note', {
    heading: DataTypes.STRING,
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    notebookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.note.belongsTo(models.notebook);
      }
    }
  });
  return note;
};