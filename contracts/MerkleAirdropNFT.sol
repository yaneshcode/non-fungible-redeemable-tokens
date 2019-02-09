pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
contract NFT is ERC721Full {
  constructor() ERC721Full("Collectible", "COL") public {}

  struct Colour {
    uint8 red;
  }

  Colour[] colours;

  function mint() public {
    Colour memory _colour = Colour(uint8(now));
    uint _id = colours.push(_colour) - 1;
    _mint(msg.sender, _id);
  }

  function getColourFromId(uint id) public view returns(uint8) {
    return (colours[id].red);
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
