const request = require("supertest");
const app = require("../src/app");

describe("GET /api/services", () => {
  it("no search term", async (done) => {
    const response = await request(app).get("/api/services");
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records.length).toBeGreaterThanOrEqual(10);

    done();
  });
});

describe("GET /api/services?q=therapy", () => {
  it("getting services using a single search term, checks products and company name", async (done) => {
    const response = await request(app).get("/api/services?q=therapy");
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records.length).toBeGreaterThanOrEqual(2);

    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Real",
        }),
        expect.objectContaining({
          name: "Alma",
        }),
      ])
    );

    done();
  });
});

describe("GET /api/services?q=giving", () => {
  it("uses synonyms of the search term", async (done) => {
    const response = await request(app).get("/api/services?q=giving");
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records.length).toBeGreaterThanOrEqual(3);
    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Felt App",
        }),
        expect.objectContaining({
          name: "Greetabl",
        }),
        expect.objectContaining({
          name: "KiwiCo",
        }),
      ])
    );

    done();
  });
});

describe("GET /api/services?q=therepy", () => {
  it("spelling mistake returns suggestions", async (done) => {
    const response = await request(app).get("/api/services?q=therepy");
    const { records, spellingSuggestions } = response.body;

    expect(response.status).toBe(200);
    expect(records).toHaveLength(0);
    expect(spellingSuggestions).toHaveLength(3);
    expect(spellingSuggestions).toEqual(
      expect.arrayContaining(["therapy", "thereby", "whereby"])
    );
    done();
  });
});

describe("GET /api/services?q=abcdwxyz", () => {
  it("more severe spelling mistake", async (done) => {
    const response = await request(app).get("/api/services?q=abcdwxyz");
    const { records, spellingSuggestions } = response.body;

    expect(response.status).toBe(200);
    expect(records).toHaveLength(0);
    expect(spellingSuggestions).toHaveLength(0);
    done();
  });
});
