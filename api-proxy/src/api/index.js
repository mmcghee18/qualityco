const express = require("express");

const getRecords = require("./getRecords");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/get-records", getRecords);

module.exports = router;
