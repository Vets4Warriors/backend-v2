const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const HttpStatus = require('http-status-codes');
const config = require('../../lib/utils/config');
const { connect, disconnect, drop } = require('../../lib/utils/mongo');
const { generateAuthToken, makeAuthHeader } = require('../utils');
const server = require('../../server');

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(chaiHttp);

chai.should();

const baseUrl = `/api/${config.version}/branches`;

describe('Branches API', () => {
  let authHeader;
  before(async () => {
    const token = await generateAuthToken();
    authHeader = makeAuthHeader(token);
    return connect();
  });

  after(async () => {
    await drop();
    return disconnect();
  });

  describe('#get /branches', () => {
    it('should respond with an array', async () => {
      const res = await chai.request(server)
          .get(baseUrl)
          .set('authorization', authHeader);

      return Promise.resolve();
    })
  })
});
