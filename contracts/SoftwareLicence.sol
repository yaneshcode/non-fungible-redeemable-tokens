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

  // Constructor
  constructor() public {
    owner = msg.sender;

    tokens.push(
      Token({
        redeemedBy: address(0x0),
        redeemedAt: uint(now)
    });
  }

  // owner modifier
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  // whitelist modifier
  modifier onlyWhitelist() {
    require(whitelist[msg.sender]);
    _;
  }

  // transfer ownership
  function transferOwner(address newOwner) public onlyOwner
  {
    emit TransferOwner(owner, newOwner);
    owner = newOwner;
  }

  // add to whitelist
  function addWhitelist(address _addr) public onlyOwner {
    emit AddToWhitelist(_addr);
    whitelist[_addr] = true;
  }

  // remove from whitelist
  function removeWhitelist(address _addr) public onlyOwner {
    emit RemoveFromWhitelist(_addr);
    whitelist[_addr] = false;
  }

  // user redeem licence
  function redeem() public onlyWhitelist returns (uint tokenId){

    require(ownerToTokenId[msg.sender] == 0);

    uint memory timestamp = now;

    Token memory token = Token({
      redeemedBy: msg.sender,
      redeemedAt: timestamp
    });

    tokenId = tokens.push(token) - 1;

    ownerToTokenId[msg.sender] = tokenId;

    emit RedeemLicence(msg.sender, tokenId, timestamp);

  }

}
