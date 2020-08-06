const synonyms = require("synonyms");
const spelling = require("spelling");
const dictionary = require("spelling/dictionaries/en_US.js");
const _ = require("lodash");

const getSpellingSuggestions = (searchTerm) => {
  let spellingSuggestions = [];

  const dict = new spelling(dictionary);
  const lookup = dict.lookup(searchTerm);
  if (!lookup.found) {
    spellingSuggestions = _.take(
      lookup.suggestions.map((s) => s.word),
      3
    );
  }
  return spellingSuggestions;
};

const getSynonyms = (searchTerm) => {
  let similarNouns = [];
  const syn = synonyms(searchTerm);
  similarNouns =
    syn && syn.n
      ? _.take(
          syn.n.filter((word) => word !== searchTerm),
          5
        )
      : [];
  return similarNouns;
};

module.exports = { getSpellingSuggestions, getSynonyms };
