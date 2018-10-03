/* global describe, it */

const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../app');

const expect = chai.expect;

chai.use(chaiHttp);

require('../beforeEachApiSetup');

const request = chai.request;

async function getLastFood() {
  const res = await request(app).get('/api/food/all?userId=1');
  return res.body.food.pop().id;
}

describe('FoodController', async () => {
  describe('Get all food', () => {
    it('should return all food', () => {
      return request(app)
        .get('/api/food/all')
        .then((res) => {
          expect(res.status).eql(200);
          expect(res.body.food).to.be.an('array');
          expect(res.body.food.length).eql(2);
          expect(res.body.food[0]).to.have.property('id');
          expect(res.body.food[0]).to.have.property('name', 'test food 1');
          expect(res.body.food[0]).to.have.property('description', 'tasty test food');
          expect(res.body.food[0]).to.have.property('expirationTime', '2010-09-20');
          expect(res.body.food[0]).to.have.property('userId', 1);
        });
    });
  });

  it('should return all food with user id = 1', () => {
    return request(app)
      .get('/api/food/all?userId=2')
      .then((res) => {
        expect(res.status).eql(200);
        expect(res.body.food).to.be.an('array');
        expect(res.body.food.length).eql(1);
        expect(res.body.food[0]).to.have.property('id');
        expect(res.body.food[0]).to.have.property('name', 'test food 2');
        expect(res.body.food[0]).to.have.property('description', 'tasty test food 2');
        expect(res.body.food[0]).to.have.property('expirationTime', '2010-09-20');
        expect(res.body.food[0]).to.have.property('userId', 2);
      });
  });

  describe('Create', () => {
    it('should return 200 HTTP code and created food', () => {
      return request(app)
        .post('/api/food?userId=1')
        .send({
          name: 'new food',
          description: 'delicious',
          expirationTime: '10.09.2018'
        })
        .then((res) => {
          expect(res.status).eql(200);
          expect(res.body.food).to.have.property('id');
          expect(res.body.food).to.have.property('name', 'new food');
          expect(res.body.food).to.have.property('description', 'delicious');
          expect(res.body.food).to.have.property('userId', '1');
          expect(res.body.food.id).to.be.an('number');
        });
    });

    it('should return 404 HTTP code and error when user was not found', () => {
      return request(app)
        .post('/api/food?userId=13')
        .send({
          name: 'new food',
          description: 'delicious',
          expirationTime: '10.09.2018'
        })
        .then((res) => {
          expect(res.status).eql(404);
          expect(res.body).eql({ error: 'User with 13 id wasn\'t found' });
        });
    });

    it('should return 400 HTTP code and error when some field is missing in request', () => {
      return request(app)
        .post('/api/food?userId=1')
        .send({
          name: 'some name',
          description: 'some description'
        })
        .then((res) => {
          expect(res.status).eql(400);
          expect(res.body).eql({ error: 'Key \'expirationTime\' is missing in request' });
        });
    });
  });

  describe('Get one product', () => {
    it('should return 200 HTTP code and product with specified id of user with id=1', async () => {
      const lastFoodId = await getLastFood();
      return request(app)
        .get(`/api/food/${lastFoodId}?userId=1`)
        .then((res) => {
          expect(res.status).eql(200);
          expect(res.body.food).to.have.property('id');
          expect(res.body.food).to.have.property('name', 'test food 1');
          expect(res.body.food).to.have.property('description', 'tasty test food');
          expect(res.body.food).to.have.property('expirationTime', '2010-09-20');
          expect(res.body.food).to.have.property('userId', 1);
        });
    });

    it('should return 404 HTTP code when specified product was not found', async () => {
      return request(app)
        .get('/api/food/1?userId=1')
        .then((res) => {
          expect(res.status).eql(404);
          expect(res.body).eql({ error: 'Food of this user was not found' });
        });
    });

    it('should return 400 HTTP code when userId was not specified', () => {
      return request(app)
        .get('/api/food/1')
        .then((res) => {
          expect(res.status).eql(400);
          expect(res.body).eql({ error: 'Key \'userId\' is missing in request' });
        });
    });
  });

  describe('Update one', () => {
    it('should return 200 HTTP code and updated product with specified id of user with id=1', async () => {
      const lastFoodId = await getLastFood();
      return request(app)
        .put(`/api/food/${lastFoodId}?userId=1`)
        .send({ name: 'new food name' })
        .then((res) => {
          expect(res.status).eql(200);
          expect(res.body.food).to.have.property('id');
          expect(res.body.food).to.have.property('name', 'new food name');
          expect(res.body.food).to.have.property('description', 'tasty test food');
          expect(res.body.food).to.have.property('expirationTime', '2010-09-20');
          expect(res.body.food).to.have.property('userId', 1);
        });
    });

    it('should return 404 HTTP code when product was not found', () => {
      return request(app)
        .put('/api/food/1?userId=1')
        .send({ name: 'new food name' })
        .then((res) => {
          expect(res.status).eql(404);
          expect(res.body).eql({ error: 'Food of this user was not found' });
        });
    });

    it('should return 400 HTTP code and when no userId was passed', () => {
      return request(app)
        .put('/api/food/1')
        .send({ name: 'new food name' })
        .then((res) => {
          expect(res.status).eql(400);
          expect(res.body).eql({ error: 'Key \'userId\' is missing in request' });
        });
    });
  });

  describe('Delete food', () => {
    it('should return 200 HTTP code and updated product with specified id of user with id=1', async () => {
      const lastFoodId = await getLastFood();
      return request(app)
        .delete(`/api/food/${lastFoodId}?userId=1`)
        .then((res) => {
          expect(res.status).eql(200);
          expect(res.body.food).to.have.property('id');
          expect(res.body.food).to.have.property('name', 'test food 1');
          expect(res.body.food).to.have.property('description', 'tasty test food');
          expect(res.body.food).to.have.property('expirationTime', '2010-09-20');
          expect(res.body.food).to.have.property('userId', 1);
        });
    });

    it('should return 404 code when no product was found', () => {
      return request(app)
        .delete('/api/food/1?userId=1')
        .then((res) => {
          expect(res.status).eql(404);
          expect(res.body).eql({ error: 'Food of this user was not found' });
        });
    });
  });

  // describe('Get user\'s booked food', () => {
  //   it('should return 200 HTTP code and booked food of user with id = 2', () => {
  //     return request(app)
  //       .get('/api/food/book/recipient/2')
  //       .then((res) => {
  //         console.log('$$$$$$$$$$$11');
  //         console.log(res.body)
  //       });
  //   });
  // });
});