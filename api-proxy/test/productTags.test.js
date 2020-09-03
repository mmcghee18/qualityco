const request = require("supertest");
const app = require("../src/app");
const _ = require("lodash");

describe("GET /api/productTags", () => {
  it("get all possible tags", async (done) => {
    const response = await request(app).get("/api/productTags");
    const tags = response.body.tags;

    expect(response.status).toBe(200);
    expect(tags.length).toBeGreaterThan(0);
    _.forEach(tags, (tag) => {
      expect(tag).toHaveProperty("tag");
      //expect(tag).toHaveProperty("type");
    });

    done();
  });
});
