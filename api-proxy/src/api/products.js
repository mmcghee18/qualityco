const express = require("express");
const Airtable = require("airtable");

const router = express.Router();

router.get("/", (req, res) => {
  const { q } = req.query;
  // console.log(req.query);
  // console.log(JSON.parse(req.query.tags));

  const response = [];

  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN" // Consumer Products table
  );
  base("Consumer Products")
    .select({
      pageSize: 10,
      view: "Grid view",
      filterByFormula: `OR(
                          FIND(LOWER("${q}"), LOWER(Company)) > 0,
                          FIND(LOWER("${q}"), LOWER(ARRAYJOIN(Products, ","))) > 0,
                          FIND(LOWER("${q}"), LOWER(ARRAYJOIN(Category, ","))) > 0
                        )`,
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
          console.log("Retrieved", record.get("Company"));
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
