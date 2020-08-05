const express = require("express");
const Airtable = require("airtable");
const _ = require("lodash");

const router = express.Router();

router.get("/", (req, res) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN" // Consumer Products table
  );
  const searchTerm = req.query.q ? req.query.q : null;
  const tags = req.query.tags ? JSON.parse(req.query.tags) : null;
  const response = [];

  const tagFormula = tags
    ? `AND(${tags
        .map((tag) => `FIND(LOWER("${tag}"), LOWER(ARRAYJOIN(Tags, ","))) > 0`)
        .join(", ")})`
    : null;

  const formula = tags
    ? `AND(
      OR(
        FIND(LOWER("${searchTerm}"), LOWER(Company)) > 0,
        FIND(LOWER("${searchTerm}"), LOWER(ARRAYJOIN(Products, ","))) > 0,
        FIND(LOWER("${searchTerm}"), LOWER(ARRAYJOIN(Category, ","))) > 0
      ),
      ${tagFormula}
    )`
    : `OR(
      FIND(LOWER("${searchTerm}"), LOWER(Company)) > 0,
      FIND(LOWER("${searchTerm}"), LOWER(ARRAYJOIN(Products, ","))) > 0,
      FIND(LOWER("${searchTerm}"), LOWER(ARRAYJOIN(Category, ","))) > 0
    )`;

  base("Consumer Products")
    .select({
      pageSize: 10,
      view: "Grid view",
      filterByFormula: formula,
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
          response.push(record.fields);
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      },
      function done(err) {
        res.json({
          records: response,
        });
        if (err) {
          console.error(err);
          return;
        }
      }
    );
});

module.exports = router;
