// Import Sequelize.
var Sequelize = require('sequelize');

// Model for storing tickets.
module.exports = function(sequelize) {
    var Ticket = sequelize.define('Ticket', {
        id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        client_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ticket_code: {
            type: Sequelize.INTEGER,
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
    });
    return Ticket;
};