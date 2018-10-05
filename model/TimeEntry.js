// Import Sequelize.
var Sequelize = require('sequelize');

// Model for storing users.
module.exports = function(sequelize, DataTypes) {
    var TimeEntry = sequelize.define('TimeEntry', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        client_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ticket_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // createdAt: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        // },
        // updatedAt: {
        //     type: DataTypes.DATE,
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
    });
    return TimeEntry;
};