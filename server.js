// 'use strict';
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const mysql = require('mysql');
const session = require('express-session');
const sequelize = require('sequelize');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require('./models/User');
//Required Routes
//const userRoutes = require('./routes/userRoutes.js');
// Import models.
const db = require('./models');
// Use Heroku's assigned PORT or 4000.
const PORT = process.env.PORT || 4000;
const app = express();


//MySQL 
// mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rstimekeeping_db'
});
//connection.query('USE rstimekeeping_db');	

//console.log(connection);

// mysql queries
const SELECT_ALL_DATES_QUERY = 'SELECT * FROM timeentries';
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
app.use(session({
    secret: "this is our secret sentence",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
        connection.query("SELECT * FROM users WHERE username = '" + username + "'",function(err,rows){
			if (err)
                return done(err);
			if (!rows.length) {
                return done(null, false, console.log('loginMessage', 'No user found.')); 
                // req.flash is the way to set flashdata using connect-flash
            } 
			// if the user is found but the password is wrong
            if (!( rows[0].password == password)) 
                return done(null, false, console.log('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            
            // all is well, return successful user
            console.log('user found');

            return done(null, rows[0]);
        });
    }
));

// from passport documentation
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
//this resolved issue with user not going to database
passport.deserializeUser(function(id, done) {
    connection.query("select * from users where id = "+id, function(err,rows) {	
        done(err, rows[0]);
    });
});

// // Share current user with routes
// app.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     console.log('you have a user: ', res.locals.currentUser);
//     next();
// });

//Route Used
// app.use(userRoutes);

app.use(cors());

app.get('/', (req, res) => {
    // res.send('hello from the server. to get timesheet information go to /timesheet');
});

app.post('/', 
    passport.authenticate('local', { failureRedirect: '/' }, console.log('this is not working')),
    function(req, res) {
        console.log('working on authenticating user in app.post');
        res.redirect('/timesheet');
    });

//grab time entries
app.get('/timeentries', (req, res) => {
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
app.get('/timeentries/add', (req, res) => {
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

// Sync with Sequelize and start listening.
db.sequelize.sync().then(function() {
    app.listen(PORT, function () {
        console.log('Server listening on PORT: ', PORT);
    });
});