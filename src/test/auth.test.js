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
        expect(res).to.have.status(301);
        expect(res.body.message).to.be.equal("User created!");
        expect(res.body.errors.length).to.be.equal(0);
        done();
      })
      .catch(err => {
        console.log(err.message);
      });
  });
});

describe("Protected route", () => {
  it("should return 200 and user details if valid token provided", done => {
    //mock login to get token
    const valid_input = {
      email: "john@wick.com",
      password: "secret"
    };
    //send login request to the app to receive token
    chai
      .request(app)
      .post("/login")
      .send(valid_input)
      .then(login_response => {
        //add token to next request Authorization headers as Bearer adw3R£$4wF43F3waf4G34fwf3wc232!w1C"3F3VR
        const token = "Bearer " + login_response.body.token;
        chai
          .request(app)
          .get("/protected")
          .set("Authorization", token)
          .then(protected_response => {
            //assertions
            expect(protected_response).to.have.status(200);
            expect(protected_response.body.message).to.be.equal(
              "Welcome, your email is john@wick.com"
            );
            expect(protected_response.body.user.email).to.exist;
            expect(protected_response.body.errors.length).to.be.equal(0);

            done();
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  after(done => {
    //stop app server
    console.log("All tests completed, stopping server....");
    process.exit();
    done();
  });
});
