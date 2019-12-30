/**
 * test/test.js
 * Basic tests for Auth system API
 */
//import chai-http to send requests to the app
const request = require('supertest');
const app = require('../app');

describe('User registration', () => {
  test('Should return 201 and confirmation for valid input', async done => {
    //mock valid user input
    const new_user = {
      name: 'John Wick',
      email: 'john@wick.com',
      password: 'secret'
    };
    //send request to the app
    try {
      const res = await request(app)
        .post('/register')
        .send(new_user);

      expect(res.statusCode).toEqual(201);
      expect(res.body.message).toEqual('User created!');
      expect(res.body.errors.length).toEqual(0);
      done();
    } catch (err) {
      throw err;
    }
  });
});

describe('Protected route', () => {
  test('should return 200 and user details if valid token provided', async done => {
    //mock login to get token
    const valid_input = {
      email: 'john@wick.com',
      password: 'secret'
    };
    //send login request to the app to receive token
    try {
      const res = await request(app)
        .post('/login')
        .send(valid_input);
      const token = res.body.token;
      console.log('token', token);
      const protected_response = await request(app)
        .get('/protected')
        .set('Authorization', token);
      expect(protected_response.statusCode).toEqual(300);
      expect(protected_response.body.message).toEqual(
        'Welcome, your email is john@wick.com'
      );
      expect(protected_response.body.user.email).toBeDefined();
      expect(protected_response.body.errors.length).toEqual(0);
      done();
    } catch (err) {
      console.log('@@@@@@@@', err.message);
    }
  });
});
