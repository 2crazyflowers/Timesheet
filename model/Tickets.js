// Import Sequelize.
var Sequelize = require('sequelize');

// Model for storing tickets.
module.exports = function(sequelize, DataTypes) {
    var Ticket = sequelize.define('Ticket', {
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
    });
    return Ticket;
};