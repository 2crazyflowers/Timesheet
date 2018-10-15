var express = require('express');
var passport = requre('passport');
var router = express.Router();


// Get all time entries
router.get('/timeentries', isLoggedIn, (req, res) => {
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

// Get tickets
router.get('/tickets', isLoggedIn, (req, res) => {
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

//Get users
router.get('/users', isLoggedIn, (req, res) => {
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
router.post('/timeentries/userId', isLoggedIn, (req, res){
    User.findById(body.userId)
            .then(() => Blog.create(body))
            .then(blog => Promise.all(tags).then(storedTags => blog.addTags(storedTags)).then(() => blog))
            .then(blog => Blog.findOne({ where: {id: blog.id}, include: [User, Tag]}))
            .then(blogWithAssociations => res.json(blogWithAssociations))
            .catch(err => res.status(400).json({ err: `User with id = [${body.userId}] doesn\'t exist.`}))
})

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


module.exports  = router;
