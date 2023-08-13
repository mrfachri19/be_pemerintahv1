const express = require("express");
const Router = express.Router();

const authRoutes = require("../modules/auth/authRoutes");
const userRoutes = require("../modules/user/userRoutes");
const productRoutespn = require("../modules/prioritasNasional/productRoutes");
const productRouteskp = require("../modules/kegiatanPrioritas/productRoutes");
const productRoutesmp = require("../modules/majorProject/productRoutes");
const productRoutespp = require("../modules/programPrioritas/productRoutes");
const productRoutesrk = require("../modules/rencanaKerja/productRoutes");

Router.use("/auth", authRoutes);
Router.use("/user", userRoutes);
Router.use("/productpn", productRoutespn);
Router.use("/productkp", productRouteskp);
Router.use("/productmp", productRoutesmp);
Router.use("/productpp", productRoutespp);
Router.use("/productrk", productRoutesrk);


module.exports = Router;
