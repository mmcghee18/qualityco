const express = require("express");
const Airtable = require("airtable");
const _ = require("lodash");

const router = express.Router();

router.get("/", (req, res) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN"
  );
  const tags = [];

  base("Tags (Products)")
    .select({
      pageSize: 10,
      view: "Grid view",
    })
    .eachPage(
      // This function (`page`) will get called for each page of records.
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          if (_.keys(record.fields).length > 0) {
            const lowercased = _.mapKeys(record.fields, (value, key) =>
              key.toLowerCase()
            );
            tags.push(lowercased);
          }
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      },
      function done(err) {
        res.json({
          tags,
        });
        if (err) {
          console.error(err);
          return;
        }
      }
    );
});

module.exports = router;
