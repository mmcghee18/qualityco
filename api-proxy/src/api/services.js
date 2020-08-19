const express = require("express");
const Airtable = require("airtable");
const pluralize = require("pluralize");
const _ = require("lodash");
const { getSpellingSuggestions, getSynonyms } = require("./helpers.js");

const router = express.Router();

router.get("/", (req, res) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN"
  );
  // Extract query params
  const searchTerm = req.query.q ? pluralize.singular(req.query.q) : null;
  const tags = req.query.tags ? JSON.parse(req.query.tags) : null;
  const response = [];

  // Misspellings and synonyms
  let spellingSuggestions = [];
  let similarNouns = [];
  if (searchTerm) {
    spellingSuggestions = getSpellingSuggestions(searchTerm);
    similarNouns = getSynonyms(searchTerm);
  }

  // Building search formula
  const searchTermFormula = searchTerm
    ? `FIND(LOWER("${searchTerm}"), LOWER(Name)) > 0,
    FIND(LOWER("${searchTerm}"), LOWER(ARRAYJOIN(Products, ","))) > 0,
    FIND(LOWER("${searchTerm}"), LOWER(ARRAYJOIN(Category, ","))) > 0`
    : null;
  const similarWordsFormula =
    similarNouns && similarNouns.length > 0
      ? similarNouns
          .map(
            (word) =>
              `FIND(LOWER("${word}"), LOWER(Name)) > 0,
              FIND(LOWER("${word}"), LOWER(ARRAYJOIN(Products, ","))) > 0,
              FIND(LOWER("${word}"), LOWER(ARRAYJOIN(Category, ","))) > 0`
          )
          .join(", ")
      : null;
  const finalSearchFormula = searchTerm
    ? `OR(${[searchTermFormula, similarWordsFormula]
        .filter((f) => f)
        .join(", ")})`
    : null;

  const tagFormula = tags
    ? `AND(${tags
        .map((tag) => `FIND(LOWER("${tag}"), LOWER(ARRAYJOIN(Tags, ","))) > 0`)
        .join(", ")})`
    : null;

  const formula = `AND(${[finalSearchFormula, tagFormula]
    .filter((f) => f)
    .join(", ")})`;

  base("Services")
    .select({
      pageSize: 10,
      view: "Grid view",
      filterByFormula: formula,
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
          const lowercased = _.mapKeys(record.fields, (value, key) =>
            key.toLowerCase()
          );
          response.push(lowercased);
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      },
      function done(err) {
        res.json({
          records: response,
          spellingSuggestions,
        });
        if (err) {
          console.error(err);
          return;
        }
      }
    );
});

module.exports = router;
