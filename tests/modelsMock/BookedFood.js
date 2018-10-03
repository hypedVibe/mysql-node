const sinon = require('sinon');

const BookedFood = require('../../models/index').BookedFood;

exports.findOne = sinon.stub(BookedFood, 'findOne').returns(
  Promise.resolve({
    id: 1,
    recipientId: 1,
    supplierId: 2,
    foodId: 3
  })
);

exports.create = sinon.stub(BookedFood, 'create').returns(Promise.resolve());

exports.destroy = sinon.stub(BookedFood, 'destroy').returns(
  Promise.resolve()
);