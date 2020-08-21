const request = require("supertest");
const app = require("../src/app");
const _ = require("lodash");

describe("GET /api/products", () => {
  it("no search term", async (done) => {
    const response = await request(app).get("/api/products");
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records.length).toBeGreaterThanOrEqual(71);

    done();
  });
});

describe("GET /api/products?q=beverages", () => {
  it.only("getting products using a single search term, checks category", async (done) => {
    const response = await request(app).get("/api/products?q=beverages");
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records.length).toBeGreaterThanOrEqual(7);

    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          company: "Steeped Coffee",
        }),
        expect.objectContaining({
          company: "Woken Coffee",
        }),
        expect.objectContaining({
          company: "Jot Coffee",
        }),
        expect.objectContaining({
          company: "Seedlip",
        }),
        expect.objectContaining({
          company: "Copper Cow Coffee",
        }),
        expect.objectContaining({
          company: "Tea Drops",
        }),
        expect.objectContaining({
          company: "Dona",
        }),
      ])
    );

    done();
  });
});

describe("GET /api/products?q=coffee", () => {
  it("getting products using a single search term, checks products and company name", async (done) => {
    const response = await request(app).get("/api/products?q=coffee");
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records.length).toBeGreaterThanOrEqual(6);

    expect(records).toEqual(
      expect.arrayContaining([
        // These match "Coffee" in "Company"
        expect.objectContaining({
          company: "Steeped Coffee",
        }),
        expect.objectContaining({
          company: "Woken Coffee",
        }),
        expect.objectContaining({
          company: "Jot Coffee",
        }),
        expect.objectContaining({
          company: "Copper Cow Coffee",
        }),
        // These match "Coffee Table" under "Products"
        expect.objectContaining({
          company: "Hitch",
        }),
        expect.objectContaining({
          company: "Interior Define",
        }),
      ])
    );

    done();
  });
});

describe("GET /api/products?q=couch", () => {
  it("uses synonyms of the search term", async (done) => {
    const response = await request(app).get("/api/products?q=couch");
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records.length).toBeGreaterThanOrEqual(5);
    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          company: "Article",
        }),
        expect.objectContaining({
          company: "Inside Weather",
        }),
        expect.objectContaining({
          company: "Burrow",
        }),
        expect.objectContaining({
          company: "Campaign Living",
        }),
        expect.objectContaining({
          company: "Interior Define",
        }),
      ])
    );

    done();
  });
});

describe("GET /api/products?q=cowch", () => {
  it("spelling mistake returns suggestions", async (done) => {
    const response = await request(app).get("/api/products?q=cowch");
    const { records, spellingSuggestions } = response.body;

    expect(response.status).toBe(200);
    expect(records).toHaveLength(0);
    expect(spellingSuggestions).toHaveLength(3);
    expect(spellingSuggestions).toEqual(
      expect.arrayContaining(["coach", "couch", "conch"])
    );
    done();
  });
});

describe("GET /api/products?q=abcdwxyz", () => {
  it("more severe spelling mistake", async (done) => {
    const response = await request(app).get("/api/products?q=abcdwxyz");
    const { records, spellingSuggestions } = response.body;

    expect(response.status).toBe(200);
    expect(records).toHaveLength(0);
    expect(spellingSuggestions).toHaveLength(0);
    done();
  });
});

describe("GET /api/products?q=coffee&tags=['Woman-owned']", () => {
  it("filtering products with a single tag", async (done) => {
    const tags = ["Woman-owned"];
    const response = await request(app).get(
      `/api/products?q=coffee&tags=${JSON.stringify(tags)}`
    );
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records.length).toBeGreaterThanOrEqual(1);

    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          company: "Copper Cow Coffee",
        }),
      ])
    );

    done();
  });
});

describe("GET /api/products?q=sofa&tags=['Custom', 'Made in USA']", () => {
  it("filtering products with multiple tags", async (done) => {
    const tags = ["Custom", "Made in USA"];
    const response = await request(app).get(
      `/api/products?q=sofa&tags=${JSON.stringify(tags)}`
    );
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records.length).toBeGreaterThanOrEqual(2);

    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          company: "Burrow",
        }),
        expect.objectContaining({
          company: "Inside Weather",
        }),
      ])
    );

    done();
  });
});

describe("GET /api/products?q=coffee&tags=['abcdwxyz']", () => {
  it("tag that doesn't exist", async (done) => {
    const tags = ["abcdwxyz"];
    const response = await request(app).get(
      `/api/products?q=coffee&tags=${JSON.stringify(tags)}`
    );
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records).toHaveLength(0);

    done();
  });
});

describe("GET /api/products?price=['$$$']", () => {
  it("single price filter", async (done) => {
    const price = ["$$$"];
    const response = await request(app).get(
      `/api/products?price=${JSON.stringify(price)}`
    );
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records.length).toBeGreaterThanOrEqual(3);

    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          company: "Willow",
        }),
        expect.objectContaining({
          company: "Interior Define",
        }),
        expect.objectContaining({
          company: "Sarah O. Jewelry",
        }),
      ])
    );

    done();
  });
});

describe("GET /api/products?price=['$', '$$$']", () => {
  it("multiple price filters", async (done) => {
    const price = ["$", "$$$"];
    const response = await request(app).get(
      `/api/products?price=${JSON.stringify(price)}`
    );
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records.length).toBeGreaterThanOrEqual(5);

    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          company: "Terra & Co.",
        }),
        expect.objectContaining({
          company: "quip",
        }),
        expect.objectContaining({
          company: "Willow",
        }),
        expect.objectContaining({
          company: "Interior Define",
        }),
        expect.objectContaining({
          company: "Sarah O. Jewelry",
        }),
      ])
    );

    done();
  });
});

describe("GET /api/products?price=['not-a-price']", () => {
  it("invalid price filter", async (done) => {
    const price = ["not-a-price"];
    const response = await request(app).get(
      `/api/products?price=${JSON.stringify(price)}`
    );
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records.length).toBeGreaterThanOrEqual(0);

    done();
  });
});

describe("GET /api/products", () => {
  it.only("unpacks tag linked objects", async (done) => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    _.forEach(response.body.records, (record) => {
      if (record["tags"] && record["tags"].length > 0) {
        expect(record["tags"][0]).toHaveProperty("tag");
        expect(record["tags"][0]).toHaveProperty("type");
      }
    });

    done();
  });
});
