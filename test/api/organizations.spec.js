const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const HttpStatus = require('http-status-codes');
const config = require('../../lib/utils/config');
const { generateAuthToken, makeAuthHeader } = require('../utils');
const { connect, disconnect, drop } = require('../../lib/utils/mongo');
const server = require('../../server');

chai.use(chaiAsPromised);
chai.use(chaiHttp);

chai.should();

const baseUrl = `/api/${config.version}/organizations`;

const testOrgData = {
  "contact": {
    "email": "v4wclr@gmail.com",
    "phone": "555-555-5555",
    "website": "http://vets4warriors.com"
  },
  "name": "testOrg"
};
const noNameTestOrgData = {
  "contact": {
    "email": "v4wclr@gmail.com",
    "phone": "555-555-5555",
    "website": "http://www.vets4warriors.com"
  },
};


describe('Organizations API', () => {
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

  describe('#get /organizations', () => {
    it('should respond', async () => {
      const res = await chai.request(server)
          .get(baseUrl)
          .set('authorization', authHeader);

      res.body.should.be.an('array');
      res.body.should.be.an('array').that.is.empty;

      return Promise.resolve();
    })
  });

  describe('#post /organizations', () => {
    it('should successfully create', async () => {
      try {
        const res = await chai.request(server)
            .post(baseUrl)
            .set('authorization', authHeader)
            .send(testOrgData);
        console.log(res);
      } catch (err) {
        console.error(err);
        return Promise.reject();
      }


      return Promise.resolve();
    });

    it('should reject bad data', async () => {
      try {
        await chai.request(server)
            .post(baseUrl)
            .set('authorization', authHeader)
            .send(noNameTestOrgData);
        // Should throw an error
        return Promise.reject();
      } catch (err) {
        err.should.be.an('error');
        err.should.have.property('status', 400);
        err.should.have.property('message');
        err.message.should.include('Bad Request');
        return Promise.resolve();
      }
    })

  })
});
