/* global describe, it, beforeEach, afterEach */

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

const FoodService = require('../../features/food/food.service');
const UserService = require('../../features/user/user.service');

const ResponseError = require('../../errors/reponseError');

const Food = require('../modelsMock/Food');

describe('Food service', () => {
  let UserServiceMock = sinon.stub(UserService, 'get').returns(
    Promise.resolve({
      id: 1,
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@test.com'
    })
  );
  after(() => {
    UserServiceMock.restore();
  });

  describe('create', () => {
    it('should return created food', async () => {
      const foodData = {
        name: 'food',
        description: 'food description',
        expirationTime: '18.09.2018'
      };
      const result = await FoodService.create(foodData, 1);
      expect(result).eql({ id: 8,
        name: 'food1',
        description: 'awsome',
        expirationTime: '2018-10-09',
        userId: 1,
        updatedAt: '2018-09-30T19:22:24.103Z',
        createdAt: '2018-09-30T19:22:24.103Z'
      });
    });

    it('should return error when food creator (user) does not exist in db', async () => {
      UserServiceMock.restore();
      sinon.stub(UserService, 'get').throws(new ResponseError('User with 555 id wasn\'t found', 404));
      return expect(FoodService.create({
        name: 'food',
        description: 'description',
        expirationTime: '18.09.2018'
      }, 555)).to.be.rejectedWith(new ResponseError('User with 555 id wasn\'t found', 404).message);
    });
  });
});