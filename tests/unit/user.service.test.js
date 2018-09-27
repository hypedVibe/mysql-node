/* global describe, it */

const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

const userService = require('../../user/user.service');

const ResponseError = require('../../errors/reponseError');

const User = require('../modelsMock/User');

describe('User Service', () => {
  describe('createProfile', () => {
    it('should return user', async () => {
      const result = await userService.createProfile({
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

  describe('getProfile', () => {
    it('should return user', async () => {
      const result = await userService.getProfile(1);

      expect(User.findOne.calledOnce).to.eql(true);

      expect(result).to.eql({
        id: 1,
        firstName: 'Test',
        lastName: 'Test',
        email: 'test@test.com'
      });
    });

    it('should throw error when user wasn\'t found', async () => {
      User.findOne.returns(undefined);

      return expect(userService.getProfile(13)).to.be.rejectedWith(new ResponseError('User with 13 id wasn\'t found', 404).message);
    });
  });

  describe('updateProfile', () => {
    it('should return updated user', async () => {
      User.findOne.returns(
        Promise.resolve({
          id: 1,
          firstName: 'First',
          lastName: 'Last',
          email: 'test@test.com'
        })
      );

      const result = await userService.updateProfile(1, {
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
        userService.updateProfile(13, {
          firstName: 'First',
          lastName: 'Last',
        })
      ).to.be.rejectedWith(new ResponseError('User with 13 id wasn\'t found', 404).message);
    });
  });

  describe('deleteProfile', () => {
    it('should return deleted profile', async () => {
      User.findOne.returns(
        Promise.resolve({
          id: 1,
          firstName: 'First',
          lastName: 'Last',
          email: 'test@test.com'
        })
      );

      const result = await userService.deleteProfile(1);

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

      return expect(userService.deleteProfile(13)).to.be.rejectedWith(new ResponseError('User with 13 id wasn\'t found', 404).message);
    });
  });
});