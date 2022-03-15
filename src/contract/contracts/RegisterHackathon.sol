pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract HackathonTeam is ERC1155 {
    uint256 public airlineCount;
    string public baseUri;
   

    constructor() public ERC1155("") {
        airlineCount = 0;
    }


    function isHold(uint8 tokenId) view external returns(bool) {
        if(balanceOf(msg.sender, tokenId) > 0 ) {
            return true;
        } 
        return false;
    }
  
    
    function mint(uint8 tokenId) external {
        require(balanceOf(msg.sender,tokenId) <= 0, "Already minted");
        _mint(msg.sender, tokenId, 1, "");        
    }

    //function _setBaseUrl(string uri) private {
    //  baseUri = uri;
    //}
}