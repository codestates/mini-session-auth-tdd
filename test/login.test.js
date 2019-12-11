/**
 * test/test.js
 * Basic tests for Auth system API
 */
const chai = require("chai");
const expect = chai.expect;
//import chai-http to send requests to the app
const http = require("chai-http");
chai.use(http);

const app = require("../app");

describe("User login", () => {
  it("should return 200 and token for valid credentials", done => {
    //mock invalid user input
    const valid_input = {
      email: "john@wick.com",
      password: "secret"
    };
    //send request to the app
    chai
      .request(app)
      .post("/login")
      .send(valid_input)
      .then(res => {
        //console.log(res.body);
        //assertions
        expect(res).to.have.status(200);
        expect(res.body.token).to.exist;
        expect(res.body.message).to.be.equal("Auth OK");
        expect(res.body.errors.length).to.be.equal(0);
        done();
      })
      .catch(err => {
        console.log(err.message);
      });
  });
});
