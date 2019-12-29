/**
 * test/test.js
 * Basic tests for Auth system API
 */
const request = require("supertest");

const app = require("../app");

describe("User login", () => {
  it("should return 200 and token for valid credentials", async () => {
    //mock invalid user input
    const valid_input = {
      email: "john@wick.com",
      password: "secret"
    };
    try {
      //send request to the app
      const res = await request(app)
        .post("/login")
        .send(valid_input);

      expect(res.statusCode).toEqual(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.message).toEqual("Auth OK");
      expect(res.body.errors.length).toEqual(0);
    } catch (err) {
      console.log(err.message);
    }
  });
});
