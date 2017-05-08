const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const HttpStatus = require('http-status-codes');
const config = require('../../lib/utils/config');
const { connect, disconnect, drop } = require('../../lib/utils/mongo');
const server = require('../../server');

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(chaiHttp);

chai.should();

const baseUrl = '/api/branches';

describe('Branches API', () => {
  before(() => {
    return connect();
  });

  after(async () => {
    await drop();
    return disconnect();
  });

  describe('#get /branches', () => {
    it('should respond with an array', async () => {
      return chai.request(server)
          .get(baseUrl).should.be.fulfilled;
    })
  })
});
