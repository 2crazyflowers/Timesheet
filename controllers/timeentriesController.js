const db = require('../models');

// Defining methods for the timeentriesController
module.exports = {
  findAll: function (req, res) {
      db.TimeEntry
          .find(req.query)
          .then(dbModel => res.json(dbModel))
          .catch(err => console.log('the findall for TimeEntry is not working in timeentriesController.js error: ' + err));
          // .catch(err => res.status(422).json(err));
  },
  create(req, res) {
      db.TimeEntry
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => console.log('the create/add TimeEntry is not working in timeentriesController.js error: ' + err));
          // .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.TimeEntry
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the findbyid TimeEntry is not working in timeentriesController.js error: ' + err));
    //res.status(422).json(err));
  },
  update: function (req, res) {
    db.TimeEntry
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the update TimeEntry is not working in timeEntrysController.js error: ' + err));
    //res.status(422).json(err));
  },
  remove: function (req, res) {
    db.TimeEntry
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the remove TimeEntry is not working in timeentriesController.js error: ' + err));
    //res.status(422).json(err));
  },
};