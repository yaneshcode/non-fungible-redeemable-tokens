const OwnerDemo = artifacts.require("OwnerDemo");

module.exports = function(deployer) {
  deployer.deploy(OwnerDemo);
};
