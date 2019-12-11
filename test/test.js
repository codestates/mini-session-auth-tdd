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

describe("App basics", () => {
  it("Should exists", () => {
    expect(app).to.be.a("function");
  });

  it("GET / should return 200 and message", done => {
    //send request to the app
    chai
      .request(app)
      .get("/")
      .then(res => {
        //assertions
        //console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body.message).to.contain("Yabadabadooo");
        done();
      })
      .catch(err => {
        console.log(err.message);
      });
  });
});
