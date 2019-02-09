pragma solidity ^0.5.0;

contract SLT {

  string public tokenName = "Software Licence Token";
  string public tokenSymbol = "SLT";

  address public owner;

  struct Token {
    address mintedBy;
    uint mintedAt;
  }

  Token[] tokens;

  mapping (uint => address) public tokenIndexToOwner;
  mapping (address => uint) ownershipTokenCount;

  constructor() public {
    owner = msg.sender;
  }



  function mint() public returns (uint tokenId){
    Token memory token = Token({
        mintedBy: msg.sender,
        mintedAt: uint(now)
      });

      // mintevent
    tokenId = tokens.push(token) - 1;

    ownershipTokenCount[msg.sender]++;
    tokenIndexToOwner[tokenId] = msg.sender;

    // event
  }

}

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
