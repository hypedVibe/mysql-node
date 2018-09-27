const sinon = require('sinon');

const User = require('../../models/index').User;

exports.create = sinon.stub(User, 'create').returns(
  Promise.resolve({
    id: 1,
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@test.com'
  })
);
