// 'use strict';
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const session = require('express-session');
const sequelize = require('sequelize');
const routes = require('./routes');
const User = require('./models/User');
// Import models.
const db = require('./models');
// Use Heroku's assigned PORT or 4000.
const PORT = process.env.PORT || 4000;
const app = express();


//MySQL 
// mysql connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'rstimekeeping_db'
// });
//connection.query('USE rstimekeeping_db');	

//console.log(connection);

// mysql queries
// const SELECT_ALL_DATES_QUERY = 'SELECT * FROM timeentries';
// const SELECT_ALL_TICKETS_QUERY = 'SELECT * FROM tickets';
// const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users';
// const INSERT_TIMEENTRY_QUERY = 'INSERT INTO timeentries (date, hours, ticket, comments, billable) VALUES(${date}, ${hours}, ${ticket}, ${comments}, ${billable})';

// connection.connect(err => {
//     if(err) {
//         console.log('There is an error connecting mysql: ', err);
//     }
// });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Passport Config
// These parameters takes property and value
// app.use(session({
//     secret: "this is our secret sentence",
//     proxy: true,
//     resave: true,
//     saveUninitialized: true
// }));

// configurePassport
const configurePassport = require('./controllers/passport');
const passport = configurePassport(app, User);

// Add routes, both API and view
app.use(routes(passport, User));

// Send every request to the React app
// Define any API routes before this runs
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, './src/public/index.html'));
// });

app.use(cors());

// app.get('/', (req, res) => {
//     // res.send('hello from the server. to get timesheet information go to /timesheet');
// });

// app.post("/", passport.authenticate("local"), function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
// });

//post user
// app.post("/", passport.authenticate("local"), function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/timeentries/' + req.user.userId);
//     //res.redirect('/timeentries');
// });

//grab time entries
app.get('/api/timeentries', (req, res) => {
    // Find all TimeEntrys
    db.TimeEntry.findAll({})
        .then(function (dbTimeEntry) {
        // If all TimeEntrys are successfully found, send them back to the client
        res.json(dbTimeEntry);
    })
    .catch(function (err) {
        // If an error occurs, send the error back to the client
        res.json(err);
    });
});

//grab tickets
app.get('/api/tickets', (req, res) => {
    // Find all Tickets
    db.Ticket.findAll({})
        .then(function (dbTicket) {
        // If all Tickets are successfully found, send them back to the client
        res.json(dbTicket);
    })
    .catch(function (err) {
        // If an error occurs, send the error back to the client
        res.json(err);
    });
});

// Route for retrieving all Users from the db
app.get('/api/users', function (req, res) {
    // Find all Users
    db.User.findAll({})
        .then(function (dbUser) {
        // If all Users are successfully found, send them back to the client
        res.json(dbUser);
        })
        .catch(function (err) {
            // If an error occurs, send the error back to the client
            res.json(err);
        });
});


// Sync with Sequelize and start listening. Once a table is created via sync, it will not be altered even though you have changed your data model definition.
// using database if it is created.
//if use .sync({ force: true })
//it would will drop your table and recreate it
db.sequelize.sync().then(function() {
    app.listen(PORT, function () {
        console.log('Server listening on PORT: ', PORT);
    });
});