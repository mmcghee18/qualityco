const express = require("express");

const products = require("./products");
const services = require("./services");
const productTags = require("./productTags");
const productCategories = require("./productCategories");
const serviceCategories = require("./serviceCategories");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/products", products);
router.use("/services", services);
router.use("/productTags", productTags);
router.use("/productCategories", productCategories);
router.use("/serviceCategories", serviceCategories);

module.exports = router;
