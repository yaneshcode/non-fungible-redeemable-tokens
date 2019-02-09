const MerkleAirdropNFT = artifacts.require("MerkleAirdropNFT");

module.exports = function(deployer) {
  deployer.deploy(MerkleAirdropNFT);
};
