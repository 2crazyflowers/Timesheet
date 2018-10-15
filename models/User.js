// Import Sequelize.
var Sequelize = require('sequelize');


// Model for storing users.
module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        username: {
            type: Sequelize.STRING(32),
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING(32),
            allowNull: false,
        }
    }, {
        classMethods: {
            associate: function (models) {
                User.hasMany(models.TimeEntry, {foreignKey: 'userId', allowNull: false});
            }
        }
    });

    // create seeds as needed
    // User.create({ id: 1, createdAt: Date.now(), username: 'test', password: 'testing' })
    
    return User;
};