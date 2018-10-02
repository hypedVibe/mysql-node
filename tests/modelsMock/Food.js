const sinon = require('sinon');

const Food = require('../../models/index').Food;

exports.create = sinon.stub(Food, 'create').returns(
  Promise.resolve({
    'id': 8,
    'name': 'food1',
    'description': 'awsome',
    'expirationTime': '2018-10-09',
    'userId': 1,
    'updatedAt': '2018-09-30T19:22:24.103Z',
    'createdAt': '2018-09-30T19:22:24.103Z'
  })
);

exports.findAll = sinon.stub(Food, 'findAll').returns(
  Promise.resolve([{
    'id': 8,
    'name': 'food1',
    'description': 'awsome',
    'expirationTime': '2018-10-09',
    'userId': 1,
    'updatedAt': '2018-09-30T19:22:24.103Z',
    'createdAt': '2018-09-30T19:22:24.103Z'
  }])
);

exports.update = sinon.stub(Food, 'update').returns(
  Promise.resolve()
);

exports.destroy = sinon.stub(Food, 'destroy').returns(
  Promise.resolve()
);