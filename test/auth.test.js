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

describe("User registration", () => {
  it("Should return 201 and confirmation for valid input", done => {
    //mock valid user input
    const new_user = {
      name: "John Wick",
      email: "john@wick.com",
      password: "secret"
    };
    //send request to the app
    chai
      .request(app)
      .post("/register")
      .send(new_user)
      .then(res => {
        //console.log(res.body);
        //assertions
        expect(res).to.have.status(201);
        expect(res.body.message).to.be.equal("User created!");
        expect(res.body.errors.length).to.be.equal(0);
        done();
      })
      .catch(err => {
        console.log(err.message);
      });
  });
});
