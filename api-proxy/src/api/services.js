const express = require("express");
const Airtable = require("airtable");
const pluralize = require("pluralize");
const _ = require("lodash");
const { getSpellingSuggestions, getSynonyms } = require("./helpers.js");

const router = express.Router();

const getCategoryInfo = (id) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN"
  );
  return new Promise((resolve, reject) => {
    base("Categories (Services)").find(id, function (err, record) {
      if (err) {
        reject(err);
        return;
      }
      resolve(_.pick(record.fields, ["Category"]));
    });
  });
};

router.get("/", (req, res) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN"
  );
  // Extract query params
  const searchTerm = req.query.q ? pluralize.singular(req.query.q) : null;
  const pageNumber = req.query.page ? parseInt(req.query.page) : null;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : null;
  const category = req.query.category ? req.query.category : null;

  // What we will return at the end
  const response = [];
  let totalNumberOfRecords = 0;

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
    FIND(LOWER("${searchTerm}"), LOWER(ARRAYJOIN(Categories, ","))) > 0`
    : null;
  const similarWordsFormula =
    similarNouns && similarNouns.length > 0
      ? similarNouns
          .map(
            (word) =>
              `FIND(LOWER("${word}"), LOWER(Name)) > 0,
              FIND(LOWER("${word}"), LOWER(ARRAYJOIN(Products, ","))) > 0,
              FIND(LOWER("${word}"), LOWER(ARRAYJOIN(Categories, ","))) > 0`
          )
          .join(", ")
      : null;
  const finalSearchFormula = searchTerm
    ? `OR(${[searchTermFormula, similarWordsFormula]
        .filter((f) => f)
        .join(", ")})`
    : null;

  const categoryFormula = category
    ? `FIND("${category}", ARRAYJOIN(Categories, ","))`
    : null;

  // The ultimate formula
  const formula = `AND(${[finalSearchFormula, categoryFormula]
    .filter((f) => f)
    .join(", ")})`;

  let currentPage = 1;
  base("Services")
    .select({
      pageSize: _.min([100, pageSize]),
      view: "Grid view",
      filterByFormula: formula,
    })
    .eachPage(
      // This function (`page`) will get called for each page of records.
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          if (!pageNumber || currentPage === pageNumber) {
            // only return the specified page
            const lowercased = _.mapKeys(record.fields, (value, key) =>
              key.toLowerCase()
            );
            response.push(lowercased);
          }
          totalNumberOfRecords += 1;
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        currentPage += 1;
        fetchNextPage();
      },
      async function done(err) {
        // Hydrate with category info
        let hydratedResponse = [];

        for (const record of response) {
          if (record["categories"]) {
            let categories = [];
            for (const categoryId of record["categories"]) {
              const categoryInfo = await getCategoryInfo(categoryId);
              const lowercaseCategoryInfo = _.mapKeys(
                categoryInfo,
                (value, key) => key.toLowerCase()
              );
              categories.push(lowercaseCategoryInfo);
            }
            _.set(record, "categories", categories);
          }
          hydratedResponse.push(record);
        }

        res.json({
          records: hydratedResponse,
          totalNumberOfRecords,
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
