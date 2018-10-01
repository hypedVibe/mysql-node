/* global describe, it */

const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

const UserService = require('../../features/user/user.service');

const ResponseError = require('../../errors/reponseError');

const User = require('../modelsMock/User');

describe('User Service', () => {
  describe('create', () => {
    it('should return user', async () => {
      const result = await UserService.create({
        firstName: 'Test',
        lastName: 'Test',
        email: 'test@test.com'
      });

      expect(User.create.calledOnce).eql(true);

      expect(result).to.eql({
        id: 1,
        firstName: 'Test',
        lastName: 'Test',
        email: 'test@test.com'
      });
    });
  });

  describe('get', () => {
    it('should return user', async () => {
      const result = await UserService.get(1);

      expect(result).to.eql({
        id: 1,
        firstName: 'Test',
        lastName: 'Test',
        email: 'test@test.com'
      });
    });

    it('should throw error when user wasn\'t found', async () => {
      User.findOne.returns(undefined);

      return expect(UserService.get(13)).to.be.rejectedWith(new ResponseError('User with 13 id wasn\'t found', 404).message);
    });
  });

  describe('update', () => {
    it('should return updated user', async () => {
      User.findOne.returns(
        Promise.resolve({
          id: 1,
          firstName: 'First',
          lastName: 'Last',
          email: 'test@test.com'
        })
      );

      const result = await UserService.update(1, {
        firstName: 'First',
        lastName: 'Last',
      });

      expect(User.update.calledOnce).eql(true);

      expect(result).to.eql({
        id: 1,
        firstName: 'First',
        lastName: 'Last',
        email: 'test@test.com'
      });
    });

    it('should throw error when user wasn\'t found', () => {
      User.findOne.returns(undefined);

      return expect(
        UserService.update(13, {
          firstName: 'First',
          lastName: 'Last',
        })
      ).to.be.rejectedWith(new ResponseError('User with 13 id wasn\'t found', 404).message);
    });
  });

  describe('delete', () => {
    it('should return deleted ', async () => {
      User.findOne.returns(
        Promise.resolve({
          id: 1,
          firstName: 'First',
          lastName: 'Last',
          email: 'test@test.com'
        })
      );

      const result = await UserService.delete(1);

      expect(User.destroy.calledOnce).eql(true);

      expect(result).to.eql({
        id: 1,
        firstName: 'First',
        lastName: 'Last',
        email: 'test@test.com'
      });
    });

    it('should return error when user was not found', async () => {
      User.findOne.returns(undefined);

      return expect(UserService.delete(13)).to.be.rejectedWith(new ResponseError('User with 13 id wasn\'t found', 404).message);
    });
  });
});