/* global describe, it */

const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../app');

const expect = chai.expect;

chai.use(chaiHttp);

require('../beforeEachSetup');

const request = chai.request;

describe('UserController', () => {
  it('should return 200 HTTP code and user', () => {
    return request(app)
      .get('/api/user/profile/3')
      .then(res => {
        expect(res.status).eql(200);
        expect(res.body).eql({
          profile:
          { id: 3,
            firstName: 'Test2',
            lastName: 'Test2',
            email: '3@test.com',
            age: 22,
            rate: null,
            createdAt: null,
            updatedAt: null
          }
        });
      });
  });
});
