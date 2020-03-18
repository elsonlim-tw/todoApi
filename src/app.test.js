const supertest = require("supertest");
const app = require("./app");

describe("todo", () => {
  let request;

  beforeEach(() => {
    request = (application = app) => supertest(application);
  });

  it("should return hello", async () => {
    const res = await request().get("/status");

    expect(res.status).toBe(200);
    expect(res.text).toBe("up");
  });
});
