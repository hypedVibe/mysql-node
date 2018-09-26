/* global describe, it */

const expect = require('chai').expect;

const { smth } = require('../../user/smth');

describe('boilerplate test', () => {
  it('should return something', () => {
    const result = smth(10);
    expect(result).eql(0);
  });
});