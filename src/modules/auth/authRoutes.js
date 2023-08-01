const express = require("express");

const Router = express.Router();

const authController = require("./authController");
// const middlewareAuth = require("../../middleware/auth");

Router.post("/register", authController.register);
Router.post("/login", authController.login);
Router.post("/forgot-password", authController.forgotPassword);
Router.patch("/reset-password", authController.resetPassword);

module.exports = Router;
