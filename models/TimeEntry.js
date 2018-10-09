// Import Sequelize.
var Sequelize = require('sequelize');

// Model for storing users.
module.exports = function(sequelize) {
    var TimeEntry = sequelize.define('TimeEntry', {
        id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        hour: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        ticket: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        // createdAt: {
        //     type: Sequelize.DATE,
        //     allowNull: false,
        //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        // },
        // updatedAt: {
        //     type: Sequelize.DATE,
        //     allowNull: false,
        //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        // },
    }, {
        classMethods: {
            associate: function(models) {
                TimeEntry.belongsTo(models.User, {foreignKey: 'id', onDelete: 'CASCADE'});
            }
        }
    });

    return TimeEntry;
};