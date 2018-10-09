// Import dependencies.
var express = require('express');
var db = require('../models');
var path = require('path');

// Initialize express router.
var router = express.Router();

// Post a new entry.
router.post('/api/timeentries', function (req, res) {
    var date = req.body.date;
    var hour = req.body.hour;
    var comment = req.body.comment;
    var billable = req.body.billable;

    if (id && date && hour && comment && billable) {
        db.TimeEntry.create({
            id: id,
            date: date,
            hour: hour,
            comment: comment,
            billable: billable
        }).then(function (entry) {
            if (tags) {
                tags.forEach(function (tag) {
                    db.Tag.findOrCreate({where: {text: tag}}).spread(function (tagInstance) {
                        entry.addEntryHasTag(tagInstance);
                    });
                });
            }
        }).then(function (data) {
            res.json(data);
        });
    } else {
        res.json('An error occurred. Post body:' + JSON.stringify(req.body, null, 2));
    }
});

router.get("/", function(req, res) {

    db.TimeEntry.findAll({}).then(function(dbTimeEntries) {
      // We have access to the Burgers as an argument inside of the callback function
      //have to create handlebars object in order for the html page to load anything other than a json array
      var hbsObject = {
        TimeEntries: dbTimeEntries
      };

      console.log(hbsObject);
      //must render here with "index" as part of the call and the handlebars object as the secondary item
      res.render("index", hbsObject);

    });
  });

  //POST route to create a burger
  router.post("/api/burgers", function(req, res) {

    db.TimeEntry.create({
        id: id,
        date: date,
        hour: hour,
        comment: comment,
        billable: billable

    }).then(function(dbTimeEntry) {
    // We have access to the new Burger as an argument inside of the callback function
      console.log(dbTimeEntry);

      //for some reason this does not have to be a res.redirect to get it to refresh the page with the correct information
      res.json(dbTimeEntry);

    });
  });

//PUT route to update or change status on devour
  app.put("/api/burgers/:id", function(req, res) {

    db.Burger.update({
        devoured: true
      }, {
        where: {
          id: req.params.id
        }
      }).then(function(dbBurger) {
        //console.log(dbBurger);
        //must use redirect here to get to update page with new information (if I was allowing user to do that)
        //res.redirect("/index");
        //res.json(dbBurger);
        res.end();

      });
  });

//DELETE route to toss the wrapper
  app.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbBurger) {
        //must use redirect here to get to destroy page with new information
        res.redirect("/index");
        //dani had to have this to make it work
        res.end();

      });
  });

// Get one random entry by googleId.
router.get('/api/entries/random/:googleId', function (req, res) {
    var googleId = req.params.googleId;

    db.sequelize.query(
        'SELECT Entries.id ' +
        'FROM Entries ' +
        'WHERE Entries.googleId = :googleId ' +
        'ORDER BY RAND() ' +
        'LIMIT 1',
        {replacements: {googleId}, type: db.sequelize.QueryTypes.SELECT}
    ).then(function(entry) {
        if (entry[0]) {
            db.Entry.findById(entry[0].id, {include: [db.Entry.tagAssociation]}).then(function(result) {
                res.json(result);
            });
        } else {
            res.json({});
        }
    });
});

// Get one specific or all entries by googleId.
router.get('/api/entries/:googleId/:entryId?', function (req, res) {
    var googleId = req.params.googleId;
    var entryId = req.params.entryId || null;
    if (entryId) {
        db.Entry.findAll({where: {googleId: googleId, id: entryId}, include: [db.Entry.tagAssociation]}).then(
            function (result) {
                res.json(result);
            }
        );
    } else {
        db.Entry.findAll({where: {googleId: googleId}, include: [db.Entry.tagAssociation]}).then(
            function (result) {
                res.json(result);
            }
        );
    }
});

// Get a user's tag usage frequency.
router.get('/api/tags/:googleId', function(req, res) {
    var googleId = req.params.googleId;

    db.sequelize.query(
        'SELECT Tags.text AS value, COUNT(Tags.text) AS count FROM Entries ' +
        'JOIN EntryTag ON EntryTag.entryId = Entries.id ' +
        'JOIN Tags ON EntryTag.tagId = Tags.id ' +
        'WHERE Entries.googleId = :googleId ' +
        'GROUP BY Tags.text',
        { replacements: { googleId }, type: db.sequelize.QueryTypes.SELECT }
    ).then(function(entries) {
        res.json(entries);
    });
});

// Get a user's entries by tag.
router.get('/api/tags/:googleId/:tagText', function(req, res) {
    var googleId = req.params.googleId;
    var tagText = req.params.tagText;

    db.sequelize.query(
        'SELECT Entries.id ' +
        'FROM Entries ' +
        'JOIN EntryTag ON EntryTag.entryId = Entries.id ' +
        'JOIN Tags ON EntryTag.tagId = Tags.id ' +
        'WHERE Entries.googleId = :googleId ' +
        'AND Tags.text = :tagText;',
        { replacements: { googleId, tagText }, type: db.sequelize.QueryTypes.SELECT }
    ).then(function(entries) {
        var entryIds = [];
        entries.forEach(function(entry) {
            entryIds.push(entry.id);
        });
        db.Entry.findAll({where: {googleId: googleId, id: {$in: entryIds}}, include: [db.Entry.tagAssociation]}).then(
            function (result) {
                res.json(result);
            }
        );
    });
});

// Update an entry by entryId. Verifies permission on googleId.
router.put('/api/entries', function(req, res) {
    var googleId = req.body.googleId;
    var entryId = req.body.entryId;
    var tagless = req.params.tagless || false;
    var date = req.body.date;
    var text = req.body.text;
    var tags = req.body.tags;

    if (googleId && entryId && date && text) {
        db.Entry.findById(entryId).then(function (entry) {
            if (entry.googleId === googleId) {
                entry.update({
                    date: date,
                    text: text
                }).then(function(entry) {
                    if (!tagless) {
                        if (tags) {
                            var tagIds = [];
                            var tagCount = 0;
                            tags.forEach(function (tag) {
                                db.Tag.findOrCreate({where: {text: tag}}).spread(function (tagInstance) {
                                    tagCount += 1;
                                    tagIds.push(tagInstance.id);

                                    // We want to set the tags inside of the callback to make sure it's async, but we only
                                    // want to do it once, so we can use 'setAssociations' and thus wipe out any removed
                                    // tags while we're at it. So we're going to test when to break and set the tags by index.
                                    if (tagCount === tags.length) {
                                        entry.setEntryHasTags(tagIds);
                                    }
                                });
                            });
                        } else {
                            entry.setEntryHasTags();
                        }
                    }

                });
            } else {
                res.json('Permission denied.');
            }
        }).then(function (data) {
            res.json(data);
        });
    } else {
        res.json('An error occurred. Put body:' + req.body.id + JSON.stringify(req.body, null, 2));
    }
});

// Delete an entry by entryId. Verifies permission on googleId.
router.delete('/api/entries/:googleId/:entryId', function(req, res) {
    var googleId = req.params.googleId;
    var entryId = req.params.entryId;

    db.Entry.findById(entryId).then(
        function (entry) {
            if (entry.googleId === googleId) {
                entry.destroy();
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        }
    );
});

// Delete user by googleId.
router.delete('/api/users/:googleId', function(req) {
    var googleId = req.params.googleId;

    db.User.findById(googleId).then(
        function(user) {
            if (user) {
                user.destroy();
            }
        }
    );
});

// Default route.
router.use('*', function (req, res) {
    res.sendFile('index.html', {root: path.resolve(__dirname, '../public')});
});

// Export routes.
module.exports = router;