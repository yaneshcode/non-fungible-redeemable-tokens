const OwnerDemo = artifacts.require("OwnerDemo");

module.exports = function(deployer) {
  deployer.deploy(OwnerDemo);
};

const MerkleAirdropNFT = artifacts.require("MerkleAirdropNFT");

module.exports = function(deployer) {
  deployer.deploy(MerkleAirdropNFT);
};
