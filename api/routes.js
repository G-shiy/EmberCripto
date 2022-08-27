const express = require("express");
const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();
routes.get("/users/:id", UserController.userById);
routes.get("/users", UserController.index);
routes.post("/users", UserController.store);

routes.post("/login", SessionController.login);

module.exports = routes;
