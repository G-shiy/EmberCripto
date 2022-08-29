const express = require("express");
const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const authMiddleware = require("./middleware/auth");

const routes = express.Router();
//USER CONTROLLER
routes.get("/users/:id", UserController.userById);
routes.get("/users",UserController.index);

//SESSION CONTROLLER
routes.post("/register", SessionController.register);
routes.post("/login", SessionController.login);

module.exports = routes;
