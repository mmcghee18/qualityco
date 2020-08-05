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

describe("GET /api/products", () => {
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

describe("GET /api/products", () => {
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
