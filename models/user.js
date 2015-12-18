'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.hasMany(models.notebook);
      },
      authenticate: function(email, password, callback) {
        this.find({where: {email: email}}).then(function(user){
          if(user) {
            bcrypt.compare(password, user.password, function(err, result){
              if(err) {
                callback(err);
              } else {
                callback(null, result ? user : false);
              }
            })
          }
        })
      }
    },
    hooks: {
      beforeCreate: function(user, options, callback) {
        if(user.password) {
          bcrypt.hash(user.password, 10, function(err, hash) {
            if(err) {
              return callback(err);
            }
            user.password = hash;
            callback(null, user)
          });
        } else {
          // TODO error reporting
          callback(null, user);
        }
      }
    }
  });
  return user;
};