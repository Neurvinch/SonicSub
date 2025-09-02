// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MyToken is ERC721,Ownable, ReentrancyGuard {
    IERC20 public usdc = IERC20(0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913);
    uint256 public monthlyPrice; // bro it 3will be 6 digits because of usdc 1000000 - $1
    uint256 public annualPrice;
    uint256 private _tokenIdCounter;
    uint256 public platformFeeBps = 500; // equla to 5%

    mapping(uint256 => uint256) public expirations;

    constructor(string memory name , string memory symbol, uint256 _monthly, uint256 _annual ) ERC721(name , symbol) Ownable(msg.sender) {

        monthlyPrice = _monthly;
        annualPrice = _annual;
    }

    function mint (bool isAnnual , bool useUSDC ) external payable nonReentrant {
        uint256 price = isAnnual ? annualPrice : monthlyPrice;
        uint256 duration = isAnnual ?  365 days : 30 days;
        uint256 fee = (price * platformFeeBps) / 10000;
        uint256 net = price - fee;


        if (useUSDC) {
            require(usdc.transferFrom(msg.sender, owner(), net), "USDC transfer failed");
            require(usdc.transferFrom(msg.sender, address(this), fee), "Fee failed" );

        } else {
            require(msg.value == price, "Wrong ETH");
            payable (owner()).transfer(net);
            (bool sent, ) = payable (address(this)).call{value:fee} (" ");
            require(sent, "Fee transfer failed");
        }

        uint256 tokenId = _tokenIdCounter++;
        _safeMint(msg.sender, tokenId);
        expirations[tokenId] = block.timestamp + duration;


    }

      function isValid(uint256 tokenId) external view returns (bool) {
        return ownerOf(tokenId) != address(0) && block.timestamp < expirations[tokenId];
      }

      receive() external payable { }
   
     


}
