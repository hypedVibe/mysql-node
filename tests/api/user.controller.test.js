/* global describe, it */

const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../app');

const expect = chai.expect;

chai.use(chaiHttp);

require('../beforeEachApiSetup');

const request = chai.request;

describe('UserController', () => {
  describe('Get user', () => {
    it('should return 200 HTTP code and user', () => {
      return request(app)
        .get('/api/user/profile/3')
        .then((res) => {
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

    it('should return 404 HTTP code and error when user does not exist in db', () => {
      return request(app)
        .get('/api/user/profile/13')
        .then((res) => {
          expect(res.status).eql(404);
          expect(res.body).eql({ error: 'User with 13 id wasn\'t found' });
        });
    });
  });

  describe('Create user', () => {
    it('should return created user', () => {
      return request(app)
        .post('/api/user/profile')
        .send({
          firstName: 'Test',
          lastName: 'Test',
          email: 'test@t.com'
        })
        .then((res) => {
          expect(res.status).eql(200);
          expect(res.body.profile).to.have.property('firstName', 'Test');
          expect(res.body.profile).to.have.property('lastName', 'Test');
          expect(res.body.profile).to.have.property('email', 'test@t.com');
          expect(res.body.profile).to.have.property('id');
          expect(res.body.profile.id).to.be.an('number');
        });
    });

    it('should return 400 HTTP code and error when email field was not passed', () => {
      return request(app)
        .post('/api/user/profile')
        .send({
          firstName: 'Test',
          lastName: 'Test'
        })
        .then((res) => {
          expect(res.status).eql(400);
          expect(res.body).to.have.property('error', 'Key \'email\' is missing in request');
        });
    });

    it('should return 400 HTTP code and error when firstName field was not passed', () => {
      return request(app)
        .post('/api/user/profile')
        .send({
          lastName: 'Test',
          email: 'test@t.com'
        })
        .then((res) => {
          expect(res.status).eql(400);
          expect(res.body).to.have.property('error', 'Key \'firstName\' is missing in request');
        });
    });

    it('should return 400 HTTP code and error when lastName field was not passed', () => {
      return request(app)
        .post('/api/user/profile')
        .send({
          firstName: 'Test',
          email: 'test@t.com'
        })
        .then((res) => {
          expect(res.status).eql(400);
          expect(res.body).to.have.property('error', 'Key \'lastName\' is missing in request');
        });
    });
    it('should return 400 HTTP code and error when rate was passed', () => {
      return request(app)
        .post('/api/user/profile')
        .send({
          firstName: 'Test',
          lastName: 'Test',
          email: 'test@t.com',
          rate: 5
        })
        .then((res) => {
          expect(res.status).eql(400);
          expect(res.body).to.have.property('error', 'Key \'rate\' is not allowed');
        });
    });
  });

  describe('Update user', () => {
    it('should return updated user', () => {
      return request(app)
        .put('/api/user/profile/1')
        .send({
          firstName: 'F_Name',
          lastName: 'L_Name',
          email: 'new@email.com',
          age: 22
        })
        .then((res) => {
          expect(res.status).eql(200);
          expect(res.body.profile).to.have.property('firstName', 'F_Name');
          expect(res.body.profile).to.have.property('lastName', 'L_Name');
          expect(res.body.profile).to.have.property('email', 'new@email.com');
          expect(res.body.profile).to.have.property('age', 22);
          expect(res.body.profile).to.have.property('id');
          expect(res.body.profile.id).to.be.an('number');
        });
    });

    it('should return 400 HTTP code and error when rate was passed', () => {
      return request(app)
        .put('/api/user/profile/2')
        .send({
          rate: 5
        })
        .then((res) => {
          expect(res.status).eql(400);
          expect(res.body).to.have.property('error', 'Key \'rate\' is not allowed');
        });
    });

    it('should return 404 HTTP code and error when user was not found', () => {
      return request(app)
        .put(`/api/user/profile/${Number.MAX_SAFE_INTEGER}`)
        .send({
          firstName: 'F_Name',
          lastName: 'L_Name',
          email: 'new@email.com',
          age: 22
        })
        .then((res) => {
          expect(res.status).eql(404);
          expect(res.body).to.have.property('error', 'User with 9007199254740991 id wasn\'t found');
        });
    });
  });

  describe('Delete profile', () => {
    it('should return deleted user', () => {
      return request(app)
        .delete('/api/user/profile/1')
        .then((res) => {
          expect(res.status).eql(200);
          expect(res.body.profile).to.have.property('firstName', 'Test1');
          expect(res.body.profile).to.have.property('lastName', 'Test1');
          expect(res.body.profile).to.have.property('email', '1@test.com');
          expect(res.body.profile).to.have.property('age');
          expect(res.body.profile).to.have.property('id');
          expect(res.body.profile.id).to.be.an('number');
          expect(res.body.profile).to.have.property('rate');
          expect(res.body.profile).to.have.property('createdAt');
          expect(res.body.profile).to.have.property('updatedAt');
        });
    });

    it('should return 404 HTTP code and error when user was not found', () => {
      return request(app)
        .delete(`/api/user/profile/${Number.MAX_SAFE_INTEGER}`)
        .then((res) => {
          expect(res.status).eql(404);
          expect(res.body).to.have.property('error', 'User with 9007199254740991 id wasn\'t found');
        });
    });
  });
});
