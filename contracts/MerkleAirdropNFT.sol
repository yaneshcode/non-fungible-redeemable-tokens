pragma solidity ^0.5.0;

contract MerkleAirdropNFT {
  address public owner;

  event TransferOwner(address from, address to);

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function transferOwner(address newOwner)
    public
    onlyOwner
  {
    emit TransferOwner(owner, newOwner);
    owner = newOwner;
  }

}
