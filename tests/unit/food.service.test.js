/* global describe, it, after */

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
      expect(result).eql({
        id: 8,
        name: 'food1',
        description: 'awsome',
        expirationTime: '2018-10-09',
        userId: 1,
        updatedAt: '2018-09-30T19:22:24.103Z',
        createdAt: '2018-09-30T19:22:24.103Z'
      });
    });

    it('should return error when food creator (user) does not exist in db', () => {
      UserServiceMock.restore();
      sinon.stub(UserService, 'get').throws(new ResponseError('User with 555 id wasn\'t found', 404));
      return expect(FoodService.create({
        name: 'food',
        description: 'description',
        expirationTime: '18.09.2018'
      }, 555)).to.be.rejectedWith(new ResponseError('User with 555 id wasn\'t found', 404).message);
    });
  });

  describe('update', () => {
    it('should return updated food of current user', async () => {
      UserServiceMock.restore();
      Food.findAll.returns(Promise.resolve([{
        id: 8,
        name: 'updated food',
        description: 'awsome',
        expirationTime: '2018-10-09',
        userId: 1,
        updatedAt: '2018-09-30T19:22:24.103Z',
        createdAt: '2018-09-30T19:22:24.103Z' 
      }]));

      const result = await FoodService.update({ name: 'updated food' }, 8, 1);

      expect(result).eql([{
        id: 8,
        name: 'updated food',
        description: 'awsome',
        expirationTime: '2018-10-09',
        userId: 1,
        updatedAt: '2018-09-30T19:22:24.103Z',
        createdAt: '2018-09-30T19:22:24.103Z' 
      }]);
    });

    it('should return error when user tried to update not his food', () => {
      sinon.stub(FoodService, 'findUsersFood').throws(new ResponseError('Food of this user was not found', 404));
      return expect(FoodService.update({ name: 'new name' }, 8, 10)).to.be.rejectedWith(new ResponseError('Food of this user was not found', 404).message);
    });
  });

  describe('findUsersFood', () => {
    it('should return product of user', async () => {
      FoodService.findUsersFood.restore();
      const result = await FoodService.findUsersFood(8, 1);
      expect(result).eql([{
        id: 8,
        name: 'updated food',
        description: 'awsome',
        expirationTime: '2018-10-09',
        userId: 1,
        updatedAt: '2018-09-30T19:22:24.103Z',
        createdAt: '2018-09-30T19:22:24.103Z' 
      }]);
    });

    it('should return throw error when users food was not found', () => {
      Food.findAll.returns(Promise.resolve(undefined));

      return expect(FoodService.findUsersFood(8, 10)).to.be.rejectedWith(new ResponseError('Food of this user was not found', 404).message);
    });
  });

  describe('findAllFood', () => {
    it('should return all food', async () => {
      Food.findAll.returns(Promise.resolve(
        [
          {
            id: 8,
            name: 'food1',
            description: 'awsome',
            expirationTime: '2018-10-09',
            userId: 1,
            updatedAt: '2018-09-30T19:22:24.103Z',
            createdAt: '2018-09-30T19:22:24.103Z' 
          }, {
            id: 10,
            name: 'food2',
            description: 'awsome',
            expirationTime: '2018-10-09',
            userId: 10,
            updatedAt: '2018-09-30T19:22:24.103Z',
            createdAt: '2018-09-30T19:22:24.103Z' 
          }
        ]
      ));
      const result = await FoodService.findAllFood();
      expect(result).eqls([{
        id: 8,
        name: 'food1',
        description: 'awsome',
        expirationTime: '2018-10-09',
        userId: 1,
        updatedAt: '2018-09-30T19:22:24.103Z',
        createdAt: '2018-09-30T19:22:24.103Z'
      }, {
        id: 10,
        name: 'food2',
        description: 'awsome',
        expirationTime: '2018-10-09',
        userId: 10,
        updatedAt: '2018-09-30T19:22:24.103Z',
        createdAt: '2018-09-30T19:22:24.103Z' 
      }]);
    });

    it('should return all food of user with id 1', async () => {
      Food.findAll.returns(Promise.resolve([{
        id: 8,
        name: 'food1',
        description: 'awsome',
        expirationTime: '2018-10-09',
        userId: 1,
        updatedAt: '2018-09-30T19:22:24.103Z',
        createdAt: '2018-09-30T19:22:24.103Z' 
      }]));

      const result = await FoodService.findAllFood(1);

      expect(result).eql([{
        id: 8,
        name: 'food1',
        description: 'awsome',
        expirationTime: '2018-10-09',
        userId: 1,
        updatedAt: '2018-09-30T19:22:24.103Z',
        createdAt: '2018-09-30T19:22:24.103Z' 
      }]);
    });
  });

  describe('delete', () => {
    it('should return deleted product', async () => {
      const result = await FoodService.delete(8);
      expect(result).eql([{
        id: 8,
        name: 'food1',
        description: 'awsome',
        expirationTime: '2018-10-09',
        userId: 1,
        updatedAt: '2018-09-30T19:22:24.103Z',
        createdAt: '2018-09-30T19:22:24.103Z' 
      }]);
    });

    it('should throw error when user trying to delete not his food', () => {
      sinon.stub(FoodService, 'findUsersFood').throws(new ResponseError('Food of this user was not found', 404));
      return expect(FoodService.delete(8, 10)).to.be.rejectedWith(new ResponseError('Food of this user was not found', 404).message);
    });
  });
});