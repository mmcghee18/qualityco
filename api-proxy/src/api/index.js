const express = require("express");

const products = require("./products");
const services = require("./services");
const tags = require("./tags");
const categories = require("./categories");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/products", products);
router.use("/services", services);
router.use("/tags", tags);
router.use("/categories", categories);

module.exports = router;
