pragma solidity ^0.5.0;

contract SoftwareLicence {

    // Events
    event TransferOwner(address from, address to);
    event AddToWhitelist(address recipient);
    event RemoveFromWhitelist(address recipient);
    event RedeemLicence(address recipient, uint tokenId, uint timestamp);

  // Variables
  string public name = "Software Licence Token";
  string public symbol = "SLT";

  address public owner;

  struct Token {
    address redeemedBy;
    uint redeemedAt;
  }

  Token[] public tokens;

  mapping (address => uint) public ownerToTokenId;

  mapping (address => bool) public whitelist;

  constructor() public {
    owner = msg.sender;

    Token memory token = Token({
        redeemedBy: address(0x0),
        redeemedAt: uint(now)
      });

      // mintevent
      tokens.push(token) - 1;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  modifier onlyWhitelist() {
    require(whitelist[msg.sender]);
    _;
  }

  function transferOwner(address newOwner) public onlyOwner
  {
    emit TransferOwner(owner, newOwner);
    owner = newOwner;
  }

  function addWhitelist(address _addr) public onlyOwner {
    whitelist[_addr] = true;
  }

  function removeWhitelist(address _addr) public onlyOwner {
    whitelist[_addr] = false;
  }

  function redeem() public onlyWhitelist returns (uint tokenId){

    require(ownerToTokenId[msg.sender] == 0);

    Token memory token = Token({
        redeemedBy: msg.sender,
        redeemedAt: uint(now)
      });

      // mintevent
    tokenId = tokens.push(token) - 1;

    ownerToTokenId[msg.sender] = tokenId;
    /* ownershipTokenCount[msg.sender]++; */
    /* tokenIndexToOwner[tokenId] = msg.sender; */

    // event
  }

}
