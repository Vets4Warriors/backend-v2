const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const HttpStatus = require('http-status-codes');
const { ValidationError } = require('mongoose').SchemaType;
const config = require('../../lib/utils/config');
const { connect, disconnect } = require('../../lib/utils/mongo');
const Branch = require('../../lib/models/Branch');

chai.use(chaiAsPromised);

chai.should();

describe('Branch Model', () => {
  before(() => {
    return connect();
  });

  after(() => {
    return disconnect();
  });

  describe('#create()', () => {
    it('should fail when given empty data', async () => {
          return Branch.create({}).should.eventually.be.rejectedWith(ValidationError);
        }
    );
  });


});
