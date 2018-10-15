// Import Sequelize.
var Sequelize = require('sequelize');

// Model for storing tickets.
module.exports = function(sequelize) {
    var Ticket = sequelize.define('Ticket', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        client_name: {
            type: Sequelize.STRING(32),
            allowNull: false,
        },
        ticket_code: {
            type: Sequelize.INTEGER,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
    });

    // Ticket.create({ id: 1, createdAt: Date.now(), client_name: 'YMCA', ticket_code: 1020 })
    // Ticket.create({ createdAt: Date.now(), client_name: 'YMCA', ticket_code: 900 })
    // Ticket.create({ createdAt: Date.now(), client_name: 'METASUSHI', ticket_code: 5000 })
    // Ticket.create({ createdAt: Date.now(), client_name: 'ADMIN'})

    return Ticket;
};