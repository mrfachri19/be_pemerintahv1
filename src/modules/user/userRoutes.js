const express = require("express");

const Router = express.Router();

const userController = require("./userController");
// const middlewareAuth = require("../../middleware/auth");
// const middlewareUpload = require("../../middleware/uploadUser");

Router.get("/:id", userController.getUserById);
Router.get("/", userController.getAllUsers);
Router.patch("/:id", userController.updateProfile);
// Router.patch(
//   "/update-image/:id",
//   middlewareAuth.authentication,
//   middlewareUpload,
//   userController.updateImage
// );
// Router.patch(
//   "/update-password/:id",
//   middlewareAuth.authentication,
//   userController.updatePassword
// );
// Router.delete(
//   "/image/:id",
//   middlewareAuth.authentication,
//   userController.deleteImage
// );

module.exports = Router;
