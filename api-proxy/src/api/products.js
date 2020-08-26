const express = require("express");
const Airtable = require("airtable");
const pluralize = require("pluralize");
const _ = require("lodash");
const {
  getSpellingSuggestions,
  getSynonyms,
  convertState,
} = require("./helpers.js");

const router = express.Router();

const getTagInfo = (id) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN"
  );
  return new Promise((resolve, reject) => {
    base("Tags").find(id, function (err, record) {
      if (err) {
        reject(err);
        return;
      }
      resolve(_.pick(record.fields, ["Tag", "Type"]));
    });
  });
};
const getCategoryInfo = (id) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN"
  );
  return new Promise((resolve, reject) => {
    base("Categories").find(id, function (err, record) {
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
  const searchTerm = req.query.q ? pluralize.singular(req.query.q) : null; // singularize
  const tags = req.query.tags ? JSON.parse(req.query.tags) : null;
  const price = req.query.price ? JSON.parse(req.query.price) : null;
  const pageNumber = req.query.page ? parseInt(req.query.page) : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  const companyHQ = req.query.companyHQ
    ? JSON.parse(req.query.companyHQ)
    : null;
  const designed = req.query.designed ? JSON.parse(req.query.designed) : null;
  const manufactured = req.query.manufactured
    ? JSON.parse(req.query.manufactured)
    : null;
  const warehoused = req.query.warehoused
    ? JSON.parse(req.query.warehoused)
    : null;

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
    ? `FIND(LOWER("${searchTerm}"), LOWER(Company)) > 0,
    FIND(LOWER("${searchTerm}"), LOWER(ARRAYJOIN(Products, ","))) > 0,
    FIND(LOWER("${searchTerm}"), LOWER(ARRAYJOIN(Categories, ","))) > 0`
    : null;
  const similarWordsFormula =
    similarNouns && similarNouns.length > 0
      ? similarNouns
          .map(
            (word) =>
              `FIND(LOWER("${word}"), LOWER(Company)) > 0,
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

  const tagFormula = tags
    ? `AND(${tags
        .map((tag) => `FIND(LOWER("${tag}"), LOWER(ARRAYJOIN(Tags, ","))) > 0`)
        .join(", ")})`
    : null;
  const priceFormula = price
    ? `OR(${price.map((price) => `Price="${price}"`).join(", ")})`
    : null;

  const getLocalFormula = (type, states) => {
    const result = states
      ? `OR(${states
          .map((state) => {
            let otherStateVersion = "";
            if (state.toUpperCase() === state)
              otherStateVersion = convertState(state, "to-name");
            else otherStateVersion = convertState(state, "to-abbreviated");

            if (otherStateVersion) {
              return `FIND("${state}", {${type}}) > 0, FIND("${otherStateVersion}", {${type}}) > 0`;
            }
            return `FIND("${state}", {${type}}) > 0`;
          })
          .join(", ")})`
      : null;
    return result;
  };

  const localFormula =
    companyHQ || designed || manufactured || warehoused
      ? `AND(${[
          getLocalFormula("Company HQ", companyHQ),
          getLocalFormula("Designed in", designed),
          getLocalFormula("Manufactured in", manufactured),
          getLocalFormula("Warehoused in", warehoused),
        ]
          .filter((f) => f)
          .join(", ")})`
      : null;

  const formula = `AND(${[
    finalSearchFormula,
    tagFormula,
    priceFormula,
    localFormula,
  ]
    .filter((f) => f)
    .join(", ")})`;

  let currentPage = 1;
  base("Consumer Products")
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
        // Hydrate with tag and category info
        let hydratedResponse = [];
        for (const record of response) {
          if (record["tags"]) {
            let tags = [];
            for (const tagId of record["tags"]) {
              const tagInfo = await getTagInfo(tagId);
              const lowercaseTagInfo = _.mapKeys(tagInfo, (value, key) =>
                key.toLowerCase()
              );
              tags.push(lowercaseTagInfo);
            }
            _.set(record, "tags", tags);
          }
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
