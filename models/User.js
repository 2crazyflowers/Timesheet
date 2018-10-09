// Import Sequelize.
var Sequelize = require('sequelize');


// Model for storing users.
module.exports = function(sequelize) {
    var User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        // updatedAt: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        // },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        classMethods: {
            associate: function (models) {
                User.hasMany(models.TimeEntry, {foreignKey: 'id', allowNull: false});
            }
        }
    });
    return User;
};