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
          syn.n.filter((word) => word !== searchTerm && word.length > 1),
          5
        )
      : [];
  return similarNouns;
};

const convertState = (input, to) => {
  const states = [
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["American Samoa", "AS"],
    ["Arizona", "AZ"],
    ["Arkansas", "AR"],
    ["Armed Forces Americas", "AA"],
    ["Armed Forces Europe", "AE"],
    ["Armed Forces Pacific", "AP"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["District Of Columbia", "DC"],
    ["Florida", "FL"],
    ["Georgia", "GA"],
    ["Guam", "GU"],
    ["Hawaii", "HI"],
    ["Idaho", "ID"],
    ["Illinois", "IL"],
    ["Indiana", "IN"],
    ["Iowa", "IA"],
    ["Kansas", "KS"],
    ["Kentucky", "KY"],
    ["Louisiana", "LA"],
    ["Maine", "ME"],
    ["Marshall Islands", "MH"],
    ["Maryland", "MD"],
    ["Massachusetts", "MA"],
    ["Michigan", "MI"],
    ["Minnesota", "MN"],
    ["Mississippi", "MS"],
    ["Missouri", "MO"],
    ["Montana", "MT"],
    ["Nebraska", "NE"],
    ["Nevada", "NV"],
    ["New Hampshire", "NH"],
    ["New Jersey", "NJ"],
    ["New Mexico", "NM"],
    ["New York", "NY"],
    ["North Carolina", "NC"],
    ["North Dakota", "ND"],
    ["Northern Mariana Islands", "NP"],
    ["Ohio", "OH"],
    ["Oklahoma", "OK"],
    ["Oregon", "OR"],
    ["Pennsylvania", "PA"],
    ["Puerto Rico", "PR"],
    ["Rhode Island", "RI"],
    ["South Carolina", "SC"],
    ["South Dakota", "SD"],
    ["Tennessee", "TN"],
    ["Texas", "TX"],
    ["US Virgin Islands", "VI"],
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"],
  ];
  var i; // Reusable loop variable
  if (to == "to-abbreviated") {
    input = input.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    for (i = 0; i < states.length; i++) {
      if (states[i][0] == input) {
        return states[i][1];
      }
    }
  } else if (to == "to-name") {
    input = input.toUpperCase();
    for (i = 0; i < states.length; i++) {
      if (states[i][1] == input) {
        return states[i][0];
      }
    }
  }
};

module.exports = { getSpellingSuggestions, getSynonyms, convertState };
