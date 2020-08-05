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
          Name: "Real",
        }),
        expect.objectContaining({
          Name: "Alma",
        }),
      ])
    );

    done();
  });
});

describe("GET /api/services?q=science", () => {
  it.only("getting services, unexact match for search term", async (done) => {
    const response = await request(app).get("/api/services?q=science");
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records.length).toBeGreaterThanOrEqual(1);

    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Name: "KiwiCo",
        }),
      ])
    );

    done();
  });
});

describe("GET /api/services?q=abcdwxyz", () => {
  it.only("no match for search", async (done) => {
    const response = await request(app).get("/api/services?q=abcdwxyz");
    const records = response.body.records;

    expect(response.status).toBe(200);
    expect(records).toHaveLength(0);

    done();
  });
});
