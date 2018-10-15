//these are required
const router = require("express").Router();
const timeentriesController = require("../../controllers/timeentriesController");
const isAuthenticated = require('../isAuthenticated');

module.exports = function(passport){
  // Matches with "/api/timeentries"
  router.route("/")
    .get(isAuthenticated, timeentriesController.findAll)
    .post(timeentriesController.create);

  // Matches with "/api/timeentries/:id"
  router.route("/:id")
    .get(isAuthenticated, timeentriesController.findById)
    .put(timeentriesController.update)
    .delete(timeentriesController.remove);

  return router;
}