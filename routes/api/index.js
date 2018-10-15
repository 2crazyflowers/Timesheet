const router = require('express').Router();
const timeentryRoutes = require('./timeentries');
const ticketRoutes = require('./tickets');

module.exports = function(passport){
    // Time Entries 
    router.use('/timeentries', timeentryRoutes());
    // Tickets
    router.use('/tickets', ticketRoutes());

    return router;
}
