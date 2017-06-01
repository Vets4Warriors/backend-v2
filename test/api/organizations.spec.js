const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const HttpStatus = require('http-status-codes');
const config = require('../../lib/utils/config');
const { connect, disconnect, drop } = require('../../lib/utils/mongo');
const server = require('../../server');

chai.use(chaiAsPromised);
chai.use(chaiHttp);

chai.should();

const baseUrl = '/api/organizations';

const testOrgData = {
  "contact": {
    "email": "v4wclr@gmail.com",
    "phone": "555-555-5555",
    "website": "vets4warriors.com"
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
  before(() => {
    return connect();
  });

  after(async () => {
    await drop();
    return disconnect();
  });

  describe('#get /organizations', () => {
    it('should respond', async () => {
      return chai.request(server).get(baseUrl).should.eventually.resolve;
    })
  });

  describe('#post /organizations', () => {
    it('should successfully create', async (done) => {
      try {
        // const res = await chai.request(server).post(baseUrl).send(testOrgData);
      } catch (err) {
        throw err;
      }

      done();
    });

    it('should reject bad data', async (done) => {
      try {
        const res = await chai.request(server).post(baseUrl).send(noNameTestOrgData);
        done("Didn't reject.");
      } catch (err) {
        err.should.be.an.instanceof(Error);
      }
      done();
    })

  })
});
