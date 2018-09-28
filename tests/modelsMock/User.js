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

exports.findOne = sinon.stub(User, 'findOne').returns(
  Promise.resolve({
    id: 1,
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@test.com'
  })
);

exports.update = sinon.stub(User, 'update').returns(
  Promise.resolve()
);

exports.destroy = sinon.stub(User, 'destroy').returns(
  Promise.resolve()
);