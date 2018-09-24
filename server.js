'use strict';
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_ACTORS_QUERY = 'SELECT * FROM actors';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
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

app.get('/', (req, res) => {
    res.send('hello from the server. to get actors go to /actors');
});

app.get('/actors', (req, res) => {
    connection.query(SELECT_ALL_ACTORS_QUERY, (err, results) => {
        if(err) {
            console.log('there is an error getting the actors: ', err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});


//this get is not adding the test to mysql
//cannot get
//gets the existing but not 
app.get('/actors/add', (req, res) => {
    const { name, movie, award } = req.query;
    console.log(name, movie, award);
    res.send('adding actor info');
    // const INSERT_ACTOR_QUERY = 'INSERT INTO actors (name, movie, award) VALUES ($(name), $(movie), $(award))';
    // connection.query(INSERT_ACTOR_QUERY, (err, results) => {
    //     if(err) {
    //         console.log('there is an error getting the actors: ', err);
    //     } else {
    //         return res.send('you have successfully added an actor');
    //     }
    // });
});

app.listen(4000, () => {
    console.log('Server listening on PORT 4000');
});