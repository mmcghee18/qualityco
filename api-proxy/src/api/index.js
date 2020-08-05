const express = require("express");

const products = require("./products");
const services = require("./services");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/products", products);
router.use("/services", services);

module.exports = router;
