const express = require("express");

const Router = express.Router();

const productController = require("./productController");

Router.get(
  "/",
  productController.getAllProduct
);
Router.get(
  "/:id",
  productController.getProductById
);

module.exports = Router;
