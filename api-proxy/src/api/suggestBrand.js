const express = require("express");
const Airtable = require("airtable");
const _ = require("lodash");

const router = express.Router();

const checkForDuplicate = (website) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN"
  );
  return new Promise((resolve, reject) => {
    base("Brand Submissions")
      .select({
        maxRecords: 1,
        filterByFormula: `Website = "${website}"`,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          if (records.length > 0) {
            resolve(true);
            return;
          }
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve(false);
          return;
        }
      );
  });
};

router.get("/", async (req, res) => {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appop5JmfRum8l0LN"
  );
  // Extract query params
  const name = req.query.name ? req.query.name : null;
  const website = req.query.website ? req.query.website : null;

  // Check if it already exists
  try {
    const alreadyExists = await checkForDuplicate(website);

    if (!alreadyExists) {
      base("Brand Submissions").create(
        [
          {
            fields: {
              Name: name,
              Website: website,
            },
          },
        ],
        (err, records) => {
          if (err) {
            console.error(err);
            return;
          }
          records.forEach((record) => {
            console.log(`Added new brand suggestion ${record.getId()}`);
          });
        }
      );
    } else {
      console.log(`Brand suggestion already exists with website ${website}`);
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
