const OwnerDemo = artifacts.require("OwnerDemo");
const { expectEvent, shouldFail } = require('openzeppelin-test-helpers');

const mode = process.env.MODE;

let ownerDemoInstance;


contract("OwnerDemo", accounts => {

  before(async function() {
    ownerDemoInstance = await OwnerDemo.deployed();
  });

  after("write coverage/profiler output", async () => {
    if (mode === "profile") {
      await global.profilerSubprovider.writeProfilerOutputAsync();
    } else if (mode === "coverage") {
      await global.coverageSubprovider.writeCoverageAsync();
    }
  });



  it("Should have owner addres be same address who deployed contract", async () => {
    const owner = accounts[0];

    assert.equal(
      (await ownerDemoInstance.owner()),
      owner
    );
  });



  it("Should fail if a non owner calls a function with the onlyOwner modifier", async function() {
    const currentOwner = accounts[0];
    const newOwner = accounts[1];

    assert.equal(
      (await ownerDemoInstance.owner()),
      currentOwner,
      "Initial owner is not addres expected."
    );

    await shouldFail.reverting(ownerDemoInstance.transferOwner(newOwner, { from: newOwner }));
  });

  it("Should allow owner to transfer ownership", async function() {
    const currentOwner = accounts[0];
    const newOwner = accounts[1];

    assert.equal(
      (await ownerDemoInstance.owner()),
      currentOwner,
      "Initial owner is not address expected."
    );

    // SAVE LOGS
    let { logs } = await ownerDemoInstance.transferOwner(newOwner);

    assert.equal(
      (await ownerDemoInstance.owner()),
      newOwner,
      "Updated owner address is not `newOwner`'s address"
    );

    // EVENT
    await expectEvent.inLogs(logs, 'TransferOwner', { from: currentOwner, to: newOwner });

  });

});
