/*
The purpose of this file is to route for the /feeds requests. It details the controller functions that should run for each request. It defines all the necessary HTTP endpoints for the /feeds API
*/

// Creates the router via express to handle only feed routes
const router = require("express").Router();

// Delegate everything to the controller
const ctrl = require("../controllers/feedsController");

// Following the rest pattern define the routes for each HTTP method with the controller function
router.get("/", ctrl.list);
router.post("/", ctrl.create);
router.get("/:id", ctrl.getById);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

// Export the router 
module.exports = router;