const SoftwareLicence = artifacts.require("SoftwareLicence");

module.exports = function(deployer) {
  deployer.deploy(SoftwareLicence);
};
