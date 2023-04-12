// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AISenseNFT is ERC721, Ownable {
    using Strings for uint256;

    uint256 private constant ONE_MONTH = 0;
    uint256 private constant THREE_MONTHS = 1;
    uint256 private constant SIX_MONTHS = 2;
    uint256 private constant TWELVE_MONTHS = 3;

    // Add the USDT token address
    address public usdtTokenAddress = 0x900101d06A7426441Ae63e9AB3B9b0F63Be145F1;

    // Define prices for NFTs
    uint256 public PRICE_1_MONTH = 59 * 1e6; // 59 USDT
    uint256 public PRICE_3_MONTHS = 99 * 1e6; // 99 USDT
    uint256 public PRICE_6_MONTHS = 159 * 1e6; // 159 USDT
    uint256 public PRICE_12_MONTHS = 239 * 1e6; // 239 USDT

    mapping(uint256 => uint256) private _totalSupplyForDuration;

    constructor() ERC721("AISenseNFT", "AISNFT") {}

    function mintNFT(address recipient, uint256 duration) internal onlyOwner returns (uint256) {
        uint256 tokenId = _totalSupplyForDuration[duration] + 1;
        _totalSupplyForDuration[duration] = tokenId;

        uint256 collectionId = duration * 1000000 + tokenId;
        _safeMint(recipient, collectionId);

        return collectionId;
    }

    function totalSupplyForDuration(uint256 duration) public view returns (uint256) {
        return _totalSupplyForDuration[duration];
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://api.example.com/nfts/";
    }

    function _tokenURI(uint256 tokenId) internal pure returns (string memory) {
        uint256 duration = tokenId / 1000000;
        string memory folder;

        if (duration == ONE_MONTH) {
            folder = "one-month-metadata.json";
        } else if (duration == THREE_MONTHS) {
            folder = "three-months-metadata.json";
        } else if (duration == SIX_MONTHS) {
            folder = "six-months-metadata.json";
        } else if (duration == TWELVE_MONTHS) {
            folder = "twelve-months-metadata.json";
        } else {
            revert("Invalid duration");
        }

        return string(abi.encodePacked(_baseURI(), folder, "/", tokenId.toString(), ".json"));
    }

    function setPrice(uint256 duration, uint256 newPrice) external onlyOwner {
    require(newPrice > 0, "Price must be greater than zero");

    if (duration == 1) {
        PRICE_1_MONTH = newPrice;
    } else if (duration == 3) {
        PRICE_3_MONTHS = newPrice;
    } else if (duration == 6) {
        PRICE_6_MONTHS = newPrice;
    } else if (duration == 12) {
        PRICE_12_MONTHS = newPrice;
    } else {
        revert("Invalid duration");
    }
}

    function purchaseNFTWithUSDT(uint256 duration) external {
        uint256 price;

        if (duration == 1) {
            price = PRICE_1_MONTH;
        } else if (duration == 3) {
            price = PRICE_3_MONTHS;
        } else if (duration == 6) {
            price = PRICE_6_MONTHS;
        } else if (duration == 12) {
            price = PRICE_12_MONTHS;
        } else {
            revert("Invalid duration");
        }

        IERC20 usdtToken = IERC20(usdtTokenAddress);
       
        // Check if the user has enough USDT balance
        uint256 userUSDTBalance = usdtToken.balanceOf(msg.sender);
        require(userUSDTBalance >= price, "Insufficient USDT balance");

        // Transfer USDT from the user to the contract owner
        usdtToken.transferFrom(msg.sender, owner(), price);

        // Mint the NFT and send it to the user
        uint256 tokenId = mintNFT(msg.sender, duration);

        // Emit an event to notify that an NFT has been purchased with USDT
        emit NFTPurchasedWithUSDT(msg.sender, tokenId, price, duration);
    }

    // Event to notify when an NFT is purchased with USDT
    event NFTPurchasedWithUSDT(address indexed buyer, uint256 indexed tokenId, uint256 price, uint256 duration);
}

