pragma solidity ^0.5.0;

// Leveraging blockchain design patterns to
// create a contract that features Non-Fungible
// Non-Transferable Redeemable Software Licences.
//
// Design patterns used:
// - Non-Fungibility
// - Owner
// - Whitelist
//
// Contract owner can whitelist users who can
// then redeem their licence token at their
// convenience.
contract SoftwareLicence {

  // Events
  event TransferOwner(address from, address to);
  event AddToWhitelist(address recipient);
  event RemoveFromWhitelist(address recipient);
  event RedeemLicence(address recipient, uint tokenId, uint timestamp);

  // Variables
  string public name = "Software Licence Token";
  string public symbol = "SLT";

  // Contract owner
  address public owner;

  // Licence token
  struct Token {
    address redeemedBy;
    uint redeemedAt;
  }
  Token[] public tokens;

  // mappings of token ownership and whitelist
  mapping (address => uint) public ownerToTokenId;
  mapping (address => bool) public whitelist;

  // Constructor
  constructor() public {
    owner = msg.sender;

    // A genesis token minted to occupy zeroth position
    tokens.push(
      Token({
        redeemedBy: address(0x0),
        redeemedAt: uint(now)
    }));
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
  function redeem() public onlyWhitelist returns (uint tokenId) {

    // makes sure that user did not already claim a token
    require(ownerToTokenId[msg.sender] == 0);

    uint timestamp = now;

    Token memory token = Token({
      redeemedBy: msg.sender,
      redeemedAt: timestamp
    });

    tokenId = tokens.push(token) - 1;
    ownerToTokenId[msg.sender] = tokenId;

    emit RedeemLicence(msg.sender, tokenId, timestamp);

  }

}
