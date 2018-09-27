/* global describe, it */

const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));

const userService = require('../../user/user.service');

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
});