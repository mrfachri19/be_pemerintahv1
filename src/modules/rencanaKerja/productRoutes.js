const express = require("express");

const Router = express.Router();

const productController = require("./productController");

Router.get("/", productController.getAllProduct);
Router.get("/:id", productController.getProductById);
Router.post("/", productController.postProduct);
Router.patch("/:id", productController.updateProduct);
Router.delete("/:id", productController.deleteProduct);
module.exports = Router;
