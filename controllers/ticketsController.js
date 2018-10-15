const db = require('../models');

// Defining methods for the ticketsController
module.exports = {
  findAll: function (req, res) {
      db.Ticket
          .find(req.query)
          .then(dbModel => res.json(dbModel))
          .catch(err => console.log('the findall for Ticket is not working in ticketsController.js error: ' + err));
          // .catch(err => res.status(422).json(err));
  },
  create(req, res) {
      db.Ticket
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => console.log('the create/add Ticket is not working in ticketsController.js error: ' + err));
          // .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Ticket
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the findbyid Ticket is not working in ticketsController.js error: ' + err));
    //res.status(422).json(err));
  },
  update: function (req, res) {
    db.Ticket
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the update Ticket is not working in TicketssController.js error: ' + err));
    //res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Ticket
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the remove Ticket is not working in ticketsController.js error: ' + err));
    //res.status(422).json(err));
  },
};