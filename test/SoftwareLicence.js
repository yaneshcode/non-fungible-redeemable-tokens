const SoftwareLicence = artifacts.require("SoftwareLicence");
const { expectEvent, shouldFail } = require('openzeppelin-test-helpers');

contract("SoftwareLicence", function (accounts) {

  before(async function() {
    console.log(accounts[0])
    console.log(accounts[1]);
    console.log(accounts[2]);
    console.log(accounts.length);
  });

  // new contract before each test to get a clean state
  beforeEach(async function() {
    this.token = await SoftwareLicence.new({ from: accounts[0] });
  });

  after("write coverage/profiler output", async () => {
    if (mode === "profile") {
      await global.profilerSubprovider.writeProfilerOutputAsync();
    } else if (mode === "coverage") {
      await global.coverageSubprovider.writeCoverageAsync();
    }
  });

  describe('Token Properties', function() {

    it('Should have the correct name', async function() {
        (await this.token.name())
            .should.be.equal('Software Licence Token');
    });

    it('Should have the correct symbol', async function() {
        (await this.token.symbol())
            .should.be.equal('SLT');
    });

  });

  describe('Owner Patterns', function() {

    it("Should have owner addres be same address who deployed contract", async function() {
      const owner = accounts[0];

      assert.equal(
        (await this.token.owner()),
        owner,
        "Initial owner is not expected address."
      );
    });

    it("Should fail if a non owner calls transfer ownership function", async function() {
      const currentOwner = accounts[0];
      const newOwner = accounts[1];

      assert.equal(
        (await this.token.owner()),
        currentOwner,
        "Initial owner is not expected address."
      );

      await shouldFail.reverting(this.token.transferOwner(newOwner, { from: newOwner }));
    });

    it("Should allow owner to transfer ownership", async function() {
      const currentOwner = accounts[0];
      const newOwner = accounts[1];

      assert.equal(
        (await this.token.owner()),
        currentOwner,
        "Initial owner is not address expected."
      );

      await this.token.transferOwner(newOwner);

      assert.equal(
        (await this.token.owner()),
        newOwner,
        "Updated owner address is not `newOwner`'s address"
      );

    });

    it("Should fire event when transferring ownership", async function() {
      const currentOwner = accounts[0];
      const newOwner = accounts[1];

      // SAVE LOGS
      let { logs } = await this.token.transferOwner(newOwner);

      // EVENT
      await expectEvent.inLogs(logs, 'TransferOwner', { from: currentOwner, to: newOwner });

    });

  });

  describe('Whitelist Patterns', function() {

    it('Should allow owner to add to whitelist', async function() {

    });

    it('Should fail if non-owner adds to whitelist', async function() {

    });

    it('Should allow owner to remove from whitelist', async function() {

    });

    it('Should fail if non-owner removes from whitelist', async function() {

    });

    it('Should fire an event on successful addition to whitelist', async function() {

    });

    it('Should fire an event on successful removal from whitelist', async function() {

    });

  });


});
