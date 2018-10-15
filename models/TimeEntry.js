// Import Sequelize.
var Sequelize = require('sequelize');

// Model for storing users.
module.exports = function(sequelize) {
    const TimeEntry= sequelize.define('TimeEntry', {
        // ?? how is this sent? I believe it is through the entry belonging to user
        //userId: {?? how is this sent?
        //
        // },
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        hour: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
        },
        ticket: {
            type: Sequelize.STRING(32),
            allowNull: false,
        },
        comment: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        // createdAt: {
        //     type: Sequelize.DATE,
        //     allowNull: false,
        //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        // },
    }, {
        classMethods: {
            associate: function(models) {
                TimeEntry.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE'});
            }
        }
    });

    // TimeEntry.create({ id: 1, date: Date.now(), hour: 3.5, ticket: 'YMCA: 920', comment: 'Complete updates', billable: true, foreignKey : 1 })
    // TimeEntry.create({ id: 2, date: Date.now(), hour: 0.5, ticket: 'Admin', comment: 'computer issue, updates required, resolved', billable: false, foreignKey : 1 })
    // TimeEntry.create({ id: 3, date: Date.now(), hour: 1.75, ticket: 'METASUSHI', comment: 'update to about us', billable: true, foreignKey : 1 })
    // TimeEntry.create({ id: 4, date: Date.now(), hour: 1.75, ticket: 'YMCA: 1020', comment: 'Deploy v03', billable: true, foreignKey : 1 })

    return TimeEntry;

};

