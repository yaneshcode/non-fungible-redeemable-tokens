const MerkleAirdropNFT = artifacts.require("MerkleAirdropNFT");
const { expectEvent, shouldFail } = require('openzeppelin-test-helpers');

contract("MerkleAirdropNFT", function (accounts) {

  // before(async function() {
  //   console.log(accounts[0])
  //   console.log(accounts[1]);
  //   console.log(accounts[2]);
  //   console.log(accounts.length);
  // });

  beforeEach(async function() {
    this.token = await MerkleAirdropNFT.new({ from: accounts[0] });
  });

  // after("write coverage/profiler output", async () => {
  //   if (mode === "profile") {
  //     await global.profilerSubprovider.writeProfilerOutputAsync();
  //   } else if (mode === "coverage") {
  //     await global.coverageSubprovider.writeCoverageAsync();
  //   }
  // });


describe('Token Properties', function() {

    it('Should have the correct name', async function() {
        (await this.token.name())
            .should.be.equal('Software Licence Token');
    });

    it('Should have the correct symbol', async function() {
        (await this.token.symbol())
            .should.be.equal('SLT');
    });

    // it('Should have the correct number of decimals', async function() {
    //     (await this.token.decimals())
    //         .should.be.bignumber.equal(new BN(18));
    // });

});

describe('Owner Patterns', function() {
  it("Should have owner addres be same address who deployed contract", async function() {
    const owner = accounts[0];

    assert.equal(
      (await this.token.owner()),
      owner,
      "Initial owner is not addres expected."
    );
  });



  it("Should fail if a non owner calls a function with the onlyOwner modifier", async function() {
    const currentOwner = accounts[0];
    const newOwner = accounts[1];

    assert.equal(
      (await this.token.owner()),
      currentOwner,
      "Initial owner is not addres expected."
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

});
