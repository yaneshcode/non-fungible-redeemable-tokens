const SoftwareLicence = artifacts.require("SoftwareLicence");
const { expectEvent, shouldFail } = require('openzeppelin-test-helpers');

contract("SoftwareLicence", function (accounts) {

  // before(async function() {
  // });

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

    it("Should have owner address be same address who deployed contract", async function() {
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
      const owner = accounts[0];
      const user1 = accounts[1];

      await this.token.addWhitelist(user1);

      assert.equal(
        (await this.token.whitelist(user1)),
        true,
        "User has not been added to whitelist."
      );
    });

    it('Should fail if non-owner adds to whitelist', async function() {
      const owner = accounts[0];
      const user1 = accounts[1];
      const user2 = accounts[2];

      assert.equal(
        (await this.token.owner()),
        owner,
        "Initial owner is not expected address."
      );

      await shouldFail.reverting(this.token.addWhitelist(user1, { from: user2 }));

    });

    it('Should allow owner to remove from whitelist', async function() {
      const owner = accounts[0];
      const user1 = accounts[1];

      // Add a user on the whitelist to remove later
      await this.token.addWhitelist(user1);

      assert.equal(
        (await this.token.whitelist(user1)),
        true,
        "User has not been added to whitelist."
      );

      await this.token.removeWhitelist(user1);

      assert.equal(
        (await this.token.whitelist(user1)),
        false,
        "User has not been removed from whitelist."
      );
    });

    it('Should fail if non-owner removes from whitelist', async function() {
      const owner = accounts[0];
      const user1 = accounts[1];
      const user2 = accounts[2];

      assert.equal(
        (await this.token.owner()),
        owner,
        "Initial owner is not expected address."
      );

      // Add a user on the whitelist to remove later
      await this.token.addWhitelist(user1);

      assert.equal(
        (await this.token.whitelist(user1)),
        true,
        "User has not been added to whitelist."
      );

      await shouldFail.reverting(this.token.removeWhitelist(user1, { from: user2 }));

    });

    it('User should be in whitelist after successful addition', async function() {
      const owner = accounts[0];
      const user1 = accounts[1];

      await this.token.addWhitelist(user1);

      assert.equal(
        (await this.token.whitelist(user1)),
        true,
        "User has not been added to whitelist after successful addition."
      );
    });

    it('User should not be in whitelist after unsuccesful addition', async function() {
      const owner = accounts[0];
      const user1 = accounts[1];
      const user2 = accounts[2];

      assert.equal(
        (await this.token.owner()),
        owner,
        "Initial owner is not expected address."
      );

      await shouldFail.reverting(this.token.addWhitelist(user1, { from: user2 }));

      assert.equal(
        (await this.token.whitelist(user1)),
        false,
        "User has been added to whitelist after unsuccesful addition."
      );

    });

    it('User should not be in whitelist after successful removal', async function() {
      const owner = accounts[0];
      const user1 = accounts[1];

      // Add a user on the whitelist to remove later
      await this.token.addWhitelist(user1);

      assert.equal(
        (await this.token.whitelist(user1)),
        true,
        "User has not been added to whitelist."
      );

      await this.token.removeWhitelist(user1);

      assert.equal(
        (await this.token.whitelist(user1)),
        false,
        "User has not been removed from whitelist after successful removal."
      );
    });

    it('User should be in whitelist after unsuccesful removal', async function() {
      const owner = accounts[0];
      const user1 = accounts[1];
      const user2 = accounts[2];

      assert.equal(
        (await this.token.owner()),
        owner,
        "Initial owner is not expected address."
      );

      // Add a user on the whitelist to remove later
      await this.token.addWhitelist(user1);

      assert.equal(
        (await this.token.whitelist(user1)),
        true,
        "User has not been added to whitelist."
      );

      await shouldFail.reverting(this.token.removeWhitelist(user1, { from: user2 }));

      assert.equal(
        (await this.token.whitelist(user1)),
        true,
        "User has been removed from whitelist after unsuccesful removal."
      );
    });

    it('Should fire an event on successful addition to whitelist', async function() {
      const owner = accounts[0];
      const user1 = accounts[1];

      let { logs } = await this.token.addWhitelist(user1);

      assert.equal(
        (await this.token.whitelist(user1)),
        true,
        "User has not been added to whitelist."
      );

      await expectEvent.inLogs(logs, 'AddToWhitelist', { recipient: user1 });

    });

    it('Should fire an event on successful removal from whitelist', async function() {
      const owner = accounts[0];
      const user1 = accounts[1];

      // Add a user on the whitelist to remove later
      await this.token.addWhitelist(user1);

      assert.equal(
        (await this.token.whitelist(user1)),
        true,
        "User has not been added to whitelist."
      );

      let { logs } = await this.token.removeWhitelist(user1);

      assert.equal(
        (await this.token.whitelist(user1)),
        false,
        "User has not been removed from whitelist."
      );

      await expectEvent.inLogs(logs, 'RemoveFromWhitelist', { recipient: user1 });

    });

  });

  describe('Non Fungible Token Redemption', function() {

    it('Should allow whitelisted user to redeem a token', async function() {

    });

    it('Should fail if non whitelisted user tries to redeem a token', async function() {

    });

    it('Should fail if whitelisted user tries to redeem more than one token', async function() {

    });

    it('Should mint a token for user if successfully redeemed token', async function() {

    });

    it('Should not mint a token for user if unsuccesfully redeemed token', async function() {

    });

    it('Should assign a unique token to a user', async function() {

    });

    it('Should fail if a user\'s address matches someone else\'s token', async function() {

    });

    it('TokenId should increment by one with each redemption', async function() {

    });

    it('Should fire an event on successful token redemption', async function() {

    });

  });


});
