const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../app');

const expect = chai.expect;

chai.use(chaiHttp);

const request = chai.request;

describe('smth', () => {
  it('int test', () => {
    return request(app)
      .get('/api/user/profile/3')
      .then(res => {
        console.log('##########')
        console.log(res.body)
      })
  })
})
