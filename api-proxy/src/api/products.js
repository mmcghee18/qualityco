const express = require("express");
const Airtable = require("airtable");
const _ = require("lodash");
const synonyms = require("synonyms");

const router = express.Router();

router.get("/", (req, res) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN"
  );
  const searchTerm = req.query.q ? req.query.q : null;
  const tags = req.query.tags ? JSON.parse(req.query.tags) : null;
  const prices = req.query.prices ? JSON.parse(req.query.prices) : null;
  const response = [];

  // 2. Lookup search term in the dictionary, if not found, AND no records come back, we'll return some suggestions
  // 1. Also get the search term's top 3-5 synonyms and check them too

  const similarWords = _.take(
    synonyms(searchTerm).n.filter((word) => word !== searchTerm),
    5
  ); // "n" is for nouns

  const searchTermFormula = searchTerm
    ? `FIND(LOWER("${searchTerm}"), LOWER(Company)) > 0,
    FIND(LOWER("${searchTerm}"), LOWER(ARRAYJOIN(Products, ","))) > 0,
    FIND(LOWER("${searchTerm}"), LOWER(ARRAYJOIN(Category, ","))) > 0,`
    : null;
  const similarWordsFormula =
    similarWords && similarWords.length > 0
      ? similarWords
          .map(
            (word) =>
              `FIND(LOWER("${word}"), LOWER(Company)) > 0,
              FIND(LOWER("${word}"), LOWER(ARRAYJOIN(Products, ","))) > 0,
              FIND(LOWER("${word}"), LOWER(ARRAYJOIN(Category, ","))) > 0`
          )
          .join(", ")
      : null;
  const finalSearchFormula = `OR(${[searchTermFormula, similarWordsFormula]
    .filter((f) => f)
    .join(" ")})`;

  const tagFormula = tags
    ? `AND(${tags
        .map((tag) => `FIND(LOWER("${tag}"), LOWER(ARRAYJOIN(Tags, ","))) > 0`)
        .join(", ")})`
    : null;
  const priceFormula = prices
    ? `OR(${prices.map((price) => `FIND("${price}", Price) > 0`).join(", ")})`
    : null;

  const formula = `AND(${[finalSearchFormula, tagFormula, priceFormula]
    .filter((f) => f)
    .join(", ")})`;

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
