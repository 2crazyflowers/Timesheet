// 'use strict';
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const mysql = require('mysql');
const expressSession = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local");
// var users = require('./routes/users');
// const User = require("./models/userModel");
const app = express();

//MySQL 
// mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rstimesheet'
});
//console.log(connection);

// mysql queries
const SELECT_ALL_DATES_QUERY = 'SELECT * FROM timesheet';
const SELECT_ALL_TICKETS_QUERY = 'SELECT * FROM tickets';
const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users';

connection.connect(err => {
    if(err) {
        console.log('There is an error connecting mysql: ', err);
    }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Passport Config
// These parameters takes property and value
// app.use(require("express-session")({
//     secret: "this is our secret sentence",
//     resave: false,
//     saveUninitalized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// // below is from documentation
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });
// //this resolved issue with user not going to database
// passport.deserializeUser(function(id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user);
//     });
// });

// // Share current user with routes
// app.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     next();
// });

// //Route Used
// app.use(userRoutes);

app.use(cors());

app.get('/', (req, res) => {
    // res.send('hello from the server. to get timesheet information go to /timesheet');
});

//grab time entries
app.get('/timesheet', (req, res) => {
    connection.query(SELECT_ALL_DATES_QUERY, (err, results) => {
        if(err) {
            console.log('there is an error getting the dates information from server.js: ', err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});

//grab tickets
app.get('/tickets', (req, res) => {
    connection.query(SELECT_ALL_TICKETS_QUERY, (err, results) => {
        if(err) {
            console.log('there is an error getting the dates information from server.js: ', err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});

//grab users
app.get('/users', (req, res) => {
    connection.query(SELECT_ALL_USERS_QUERY, (err, results) => {
        if(err) {
            console.log('there is an error getting users info from server.js: ', err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});

// add time entry


// delete time


// edit time




//this get is not adding the browser line to mysql
//it can grab name, movie and award from info added into brower line
//and console log information
//but also get error
//localhost:4000/timesheet/add then add below
//?name=Rock&movie=The Tooth Fairy&award=no
//but some issue in query after VALUES
app.get('/timesheet/add', (req, res) => {
    const { date, hours, ticket, comments, billable } = req.query;
    console.log(date, hours, ticket, comments, billable);
    res.send('adding timesheet info');

    //double quotes remove error on 1064, not getting value of name, movie or award when written like either "$(name)" or "${name}"
    // const INSERT_ACTOR_QUERY = 'INSERT INTO actors (name, movie, award) VALUES('${name}', '${movie}', '${award}')';
    // connection.query(INSERT_ACTOR_QUERY, (err, results) => {
    //     if(err) {
    //         console.log('there is an error adding the actor: ', err);
    //     } else {
    //         return res.json(results);
    //     }
    // });
});

app.listen(4000, () => {
    console.log('Server listening on PORT 4000');
});