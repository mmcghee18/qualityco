const express = require("express");
const Airtable = require("airtable");
const pluralize = require("pluralize");
const _ = require("lodash");
const { getSpellingSuggestions, getSynonyms } = require("./helpers.js");

const router = express.Router();

const getTagInfo = (id) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN"
  );
  return new Promise((resolve, reject) => {
    base("Tags (Services)").find(id, function (err, record) {
      if (err) {
        reject(err);
        return;
      }
      resolve(_.pick(record.fields, ["Tag"]));
    });
  });
};
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
  const searchTerm = req.query.q ? req.query.q : null;
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
  const getSearchFormula = (word) => {
    const singularWord = pluralize.singular(word.toLowerCase());
    const pluralWord = pluralize.plural(word.toLowerCase());
    // 1. A full-word match in "Name" (singular or plural)
    // 2. A full-word match in "Products" (singular or plural)
    // 3. A full-word match in "Categories" (singular or plural)
    return `
      AND(
        FIND("${singularWord}", LOWER(Name)) > 0,
        OR(
          FIND("${singularWord}", LOWER(Name)) + LEN("${singularWord}") > LEN(Name),
          MID(LOWER(Name), FIND("${singularWord}", LOWER(Name)) + LEN("${singularWord}"), 1) = " "
        )
      ),
      AND(
        FIND("${pluralWord}", LOWER(Name)) > 0,
        OR(
          FIND("${pluralWord}", LOWER(Name)) + LEN("${pluralWord}") > LEN(Name),
          MID(LOWER(Name), FIND("${pluralWord}", LOWER(Name)) + LEN("${pluralWord}"), 1) = ",",
          MID(LOWER(Name), FIND("${pluralWord}", LOWER(Name)) + LEN("${pluralWord}"), 1) = " "
        )
      ),
      AND(
        FIND("${singularWord}", LOWER(ARRAYJOIN(Products, ","))) > 0,
        OR(
          FIND("${singularWord}", LOWER(ARRAYJOIN(Products, ","))) + LEN("${singularWord}") > LEN(ARRAYJOIN(Products, ",")),
          MID(LOWER(ARRAYJOIN(Products, ",")), FIND("${singularWord}", LOWER(ARRAYJOIN(Products, ","))) + LEN("${singularWord}"), 1) = ",",
          MID(LOWER(ARRAYJOIN(Products, ",")), FIND("${singularWord}", LOWER(ARRAYJOIN(Products, ","))) + LEN("${singularWord}"), 1) = " "
        )
      ),
      AND(
        FIND("${pluralWord}", LOWER(ARRAYJOIN(Products, ","))) > 0,
        OR(
          FIND("${pluralWord}", LOWER(ARRAYJOIN(Products, ","))) + LEN("${pluralWord}") > LEN(ARRAYJOIN(Products, ",")),
          MID(LOWER(ARRAYJOIN(Products, ",")), FIND("${pluralWord}", LOWER(ARRAYJOIN(Products, ","))) + LEN("${pluralWord}"), 1) = ",",
          MID(LOWER(ARRAYJOIN(Products, ",")), FIND("${pluralWord}", LOWER(ARRAYJOIN(Products, ","))) + LEN("${pluralWord}"), 1) = " "
        )
      ),
      AND(
        FIND("${singularWord}", LOWER(ARRAYJOIN(Categories, ","))) > 0,
        OR(
          FIND("${singularWord}", LOWER(ARRAYJOIN(Categories, ","))) + LEN("${singularWord}") > LEN(ARRAYJOIN(Categories, ",")),
          MID(LOWER(ARRAYJOIN(Categories, ",")), FIND("${singularWord}", LOWER(ARRAYJOIN(Categories, ","))) + LEN("${singularWord}"), 1) = ",",
          MID(LOWER(ARRAYJOIN(Categories, ",")), FIND("${singularWord}", LOWER(ARRAYJOIN(Categories, ","))) + LEN("${singularWord}"), 1) = " "
        )
      ),
      AND(
        FIND("${pluralWord}", LOWER(ARRAYJOIN(Categories, ","))) > 0,
        OR(
          FIND("${pluralWord}", LOWER(ARRAYJOIN(Categories, ","))) + LEN("${pluralWord}") > LEN(ARRAYJOIN(Categories, ",")),
          MID(LOWER(ARRAYJOIN(Categories, ",")), FIND("${pluralWord}", LOWER(ARRAYJOIN(Categories, ","))) + LEN("${pluralWord}"), 1) = ",",
          MID(LOWER(ARRAYJOIN(Categories, ",")), FIND("${pluralWord}", LOWER(ARRAYJOIN(Categories, ","))) + LEN("${pluralWord}"), 1) = " "
        )
      )`;
  };

  const searchTermFormula = searchTerm ? getSearchFormula(searchTerm) : null;
  const similarWordsFormula =
    similarNouns && similarNouns.length > 0
      ? similarNouns.map((word) => getSearchFormula(word)).join(", ")
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
