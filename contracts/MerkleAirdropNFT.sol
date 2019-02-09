pragma solidity ^0.5.0;

contract MerkleAirdropNFT {

  // Variables
  string public name = "Software Licence Token";
  string public symbol = "SLT";

  address public owner;

  struct Token {
    address redeemedBy;
    uint redeemedAt;
  }

  Token[] public tokens;

  mapping (uint => address) public tokenIndexToOwner;
  mapping (address => uint) ownershipTokenCount;

  // Events
  event TransferOwner(address from, address to);

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function transferOwner(address newOwner) public onlyOwner
  {
    emit TransferOwner(owner, newOwner);
    owner = newOwner;
  }

  function mint() public returns (uint tokenId){
    Token memory token = Token({
        redeemedBy: msg.sender,
        redeemedAt: uint(now)
      });

      // mintevent
    tokenId = tokens.push(token) - 1;

    ownershipTokenCount[msg.sender]++;
    tokenIndexToOwner[tokenId] = msg.sender;

    // event
  }

}
