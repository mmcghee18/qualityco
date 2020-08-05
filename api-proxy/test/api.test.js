const request = require("supertest");
const app = require("../src/app");

describe("GET /api", () => {
  it("responds with a json message", (done) => {
    request(app)
      .get("/api")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
          message: "API - 👋🌎🌍🌏",
        },
        done
      );
  });
});

describe("GET /api/products", () => {
  it("no search term", async (done) => {
    const response = await request(app).get("/api/products");
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records).toHaveLength(71);

    done();
  });
});

describe("GET /api/products?q=beverages", () => {
  it("getting products using a single search term, checks category", async (done) => {
    const response = await request(app).get("/api/products?q=beverages");
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records).toHaveLength(7);

    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Company: "Steeped Coffee",
        }),
        expect.objectContaining({
          Company: "Woken Coffee",
        }),
        expect.objectContaining({
          Company: "Jot Coffee",
        }),
        expect.objectContaining({
          Company: "Seedlip",
        }),
        expect.objectContaining({
          Company: "Copper Cow Coffee",
        }),
        expect.objectContaining({
          Company: "Tea Drops",
        }),
        expect.objectContaining({
          Company: "Dona",
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
    expect(records).toHaveLength(6);

    expect(records).toEqual(
      expect.arrayContaining([
        // These match "Coffee" in "Company"
        expect.objectContaining({
          Company: "Steeped Coffee",
        }),
        expect.objectContaining({
          Company: "Woken Coffee",
        }),
        expect.objectContaining({
          Company: "Jot Coffee",
        }),
        expect.objectContaining({
          Company: "Copper Cow Coffee",
        }),
        // These match "Coffee Table" under "Products"
        expect.objectContaining({
          Company: "Hitch",
        }),
        expect.objectContaining({
          Company: "Interior Define",
        }),
      ])
    );

    done();
  });
});

describe("GET /api/products?q=game", () => {
  it("getting products, unexact match for search term", async (done) => {
    const response = await request(app).get("/api/products?q=game");
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records).toHaveLength(3);

    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Company: "Little Renegades",
        }),
        expect.objectContaining({
          Company: "GenerationMindful",
        }),
        expect.objectContaining({
          Company: "Eeboo",
        }),
      ])
    );

    done();
  });
});

describe("GET /api/products?q=abcdwxyz", () => {
  it("no match for search", async (done) => {
    const response = await request(app).get("/api/products?q=abcdwxyz");
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records).toHaveLength(0);

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
    expect(records).toHaveLength(1);

    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Company: "Copper Cow Coffee",
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
    expect(records).toHaveLength(2);

    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Company: "Burrow",
        }),
        expect.objectContaining({
          Company: "Inside Weather",
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
