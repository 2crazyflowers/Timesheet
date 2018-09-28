// 'use strict';
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_DATES_QUERY = 'SELECT * FROM timesheet';

const SELECT_ALL_TICKETS_QUERY = 'SELECT * FROM tickets';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rstimesheet'
});

//console.log(connection);

// was having problems with connection and error: Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol
// requested by server; consider upgrading MySQL client
// found on stackoverflow this query to run in mysql workbench:
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
connection.connect(err => {
    if(err) {
        console.log('There is an error connecting mysql: ', err);
    }
});

app.use(cors());

// USER AUTH REQUIREMENTS:
// const passport = require('./passport');

// // Yes, the app uses express.
// const app = express();

app.get('/', (req, res) => {
    res.send('hello from the server. to get timesheet information go to /timesheet');
});

//grab time entries
app.get('/timesheet', (req, res) => {
    connection.query(SELECT_ALL_DATES_QUERY, (err, results) => {
        if(err) {
            console.log('there is an error getting the dates information: ', err);
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
            console.log('there is an error getting the dates information: ', err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});


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