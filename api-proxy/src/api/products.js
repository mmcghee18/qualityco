const express = require("express");
const Airtable = require("airtable");
const queryString = require("query-string");
const pluralize = require("pluralize");
const _ = require("lodash");
const {
  getSpellingSuggestions,
  getSynonyms,
  convertState,
} = require("./helpers.js");

const router = express.Router();

const getTagInfo = (id) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN"
  );
  return new Promise((resolve, reject) => {
    base("Tags (Products)").find(id, function (err, record) {
      if (err) {
        reject(err);
        return;
      }
      resolve(_.pick(record.fields, ["Tag", "Type"]));
    });
  });
};
const getCategoryInfo = (id) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN"
  );
  return new Promise((resolve, reject) => {
    base("Categories (Products)").find(id, function (err, record) {
      if (err) {
        reject(err);
        return;
      }
      resolve(_.pick(record.fields, ["Category"]));
    });
  });
};
const getLocationInfo = (id) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN"
  );
  return new Promise((resolve, reject) => {
    base("Locations").find(id, function (err, record) {
      if (err) {
        reject(err);
        return;
      }
      resolve(_.pick(record.fields, ["Location"]));
    });
  });
};

router.get("/", (req, res) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN"
  );
  // Extract query params
  const searchTerm = req.query.q ? req.query.q : null;
  const pageNumber = req.query.page ? parseInt(req.query.page) : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  const category = req.query.category ? req.query.category : null;

  // Array query params - if they only contain 1 item, they need to be made into arrays
  let tags = req.query.tags ? JSON.parse(req.query.tags) : null;
  if (tags && !_.isArray(tags)) tags = [tags];
  let price = req.query.price ? req.query.price : null;
  if (price && !_.isArray(price)) price = [price];
  let designedIn = req.query.designedIn ? req.query.designedIn : null;
  if (designedIn && !_.isArray(designedIn)) designedIn = [designedIn];
  let madeIn = req.query.madeIn ? req.query.madeIn : null;
  if (madeIn && !_.isArray(madeIn)) madeIn = [madeIn];

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

  // Building formulas
  const getSearchFormula = (word) => {
    const singularWord = pluralize.singular(word.toLowerCase());
    const pluralWord = pluralize.plural(word.toLowerCase());
    // 1. A full-word match in "Company" (singular or plural)
    // 2. A full-word match in "Products" (singular or plural)
    // 3. A full-word match in "Categories" (singular or plural)
    return `
      AND(
        FIND("${singularWord}", LOWER(Company)) > 0,
        OR(
          FIND("${singularWord}", LOWER(Company)) + LEN("${singularWord}") > LEN(Company),
          MID(LOWER(Company), FIND("${singularWord}", LOWER(Company)) + LEN("${singularWord}"), 1) = " "
        )
      ),
      AND(
        FIND("${pluralWord}", LOWER(Company)) > 0,
        OR(
          FIND("${pluralWord}", LOWER(Company)) + LEN("${pluralWord}") > LEN(Company),
          MID(LOWER(Company), FIND("${pluralWord}", LOWER(Company)) + LEN("${pluralWord}"), 1) = ",",
          MID(LOWER(Company), FIND("${pluralWord}", LOWER(Company)) + LEN("${pluralWord}"), 1) = " "
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

  const peopleTags = tags ? tags.filter((tag) => tag.type === "People") : null;
  const planetTags = tags ? tags.filter((tag) => tag.type === "Planet") : null;
  const peopleTagFormula =
    tags && peopleTags.length > 0
      ? `OR(${peopleTags
          .map(
            (tag) =>
              `FIND(LOWER("${tag.tag}"), LOWER(ARRAYJOIN(Tags, ","))) > 0`
          )
          .join(", ")})`
      : null;
  const planetTagFormula =
    tags && planetTags.length > 0
      ? `OR(${planetTags
          .map(
            (tag) =>
              `FIND(LOWER("${tag.tag}"), LOWER(ARRAYJOIN(Tags, ","))) > 0`
          )
          .join(", ")})`
      : null;

  const priceFormula = price
    ? `OR(${price.map((price) => `Price="${price}"`).join(", ")})`
    : null;

  const getLocationFormula = (type, states) => {
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
  const locationFormula =
    designedIn || madeIn
      ? `OR(${[
          getLocationFormula("Designed in", designedIn),
          getLocationFormula("Made in", madeIn),
        ]
          .filter((f) => f)
          .join(", ")})`
      : null;

  const categoryFormula = category
    ? `FIND("${category}", ARRAYJOIN(Categories, ","))`
    : null;

  // The ultimate formula
  const formula = `AND(${[
    finalSearchFormula,
    peopleTagFormula,
    planetTagFormula,
    priceFormula,
    locationFormula,
    categoryFormula,
  ]
    .filter((f) => f)
    .join(", ")})`;

  let currentPage = 1;
  base("Products")
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
        // Hydrate with tag, category, location info
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
          if (record["designed in"]) {
            let designLocations = [];
            for (const locationId of record["designed in"]) {
              const locationInfo = await getLocationInfo(locationId);
              const lowercaseLocationInfo = _.mapKeys(
                locationInfo,
                (value, key) => key.toLowerCase()
              );
              designLocations.push(lowercaseLocationInfo);
            }
            _.set(record, "designed in", designLocations);
          }
          if (record["made in"]) {
            let madeLocations = [];
            for (const locationId of record["made in"]) {
              const locationInfo = await getLocationInfo(locationId);
              const lowercaseLocationInfo = _.mapKeys(
                locationInfo,
                (value, key) => key.toLowerCase()
              );
              madeLocations.push(lowercaseLocationInfo);
            }
            _.set(record, "made in", madeLocations);
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
