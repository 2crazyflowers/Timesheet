//these are required
const router = require("express").Router();
const ticketsController = require("../../controllers/ticketsController");
const isAuthenticated = require('../isAuthenticated');

module.exports = function(passport){
  // Matches with "/api/tickets"
  router.route("/")
    .get(isAuthenticated, ticketsController.findAll)
    .post(ticketsController.create);

  // Matches with "/api/tickets/:id"
  router.route("/:id")
    .get(isAuthenticated, ticketsController.findById)
    .put(ticketsController.update)
    .delete(ticketsController.remove);

  return router;
}