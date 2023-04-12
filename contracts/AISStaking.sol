// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./AISense.sol";
import "./AISenseNFT.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract AISStaking is Ownable {
    using SafeMath for uint256;

    AISense public aisToken; // Declare aisToken as a state variable of type AISense
    address public burnAddress;
    uint256 public constant PERCENTAGE_TO_BURN = 50;
    uint256 public constant ONE_MONTH = 30 days;
    uint256 public constant THREE_MONTHS = 90 days;
    uint256 public constant SIX_MONTHS = 180 days;
    uint256 public constant TWELVE_MONTHS = 360 days;

    enum StakingDuration { OneMonth, ThreeMonths, SixMonths, TwelveMonths }

    struct StakingInfo {
        uint256 amount;
        uint256 startTime;
        StakingDuration duration;
    }

    mapping(address => StakingInfo) public stakingInfo;
    mapping(StakingDuration => uint256) public stakingCosts;

    event Staked(address indexed user, uint256 amount, StakingDuration duration);
    event Unstaked(address indexed user, uint256 amount);
    event StakingCostUpdated(StakingDuration duration, uint256 newCost);
    
    AISenseNFT public nftContract;

    constructor(AISense _aisToken, address _burnAddress, address _nftContract) {
        require(address(_aisToken) != address(0), "Invalid token address");
        require(_burnAddress != address(0), "Invalid burn address");

        aisToken = _aisToken;
        nftContract = AISenseNFT(_nftContract);
        burnAddress = _burnAddress;

        stakingCosts[StakingDuration.OneMonth] = 100 * 10**18;
        stakingCosts[StakingDuration.ThreeMonths] = 265 * 10**18;
        stakingCosts[StakingDuration.SixMonths] = 500 * 10**18;
        stakingCosts[StakingDuration.TwelveMonths] = 800 * 10**18;
    }

    function setStakingCost(uint256 duration, uint256 cost) external onlyOwner {
    require(duration >= uint256(StakingDuration.OneMonth) && duration <= uint256(StakingDuration.TwelveMonths), "Invalid staking duration");
    stakingCosts[StakingDuration(duration)] = cost;
    }

    function stakeTokens(StakingDuration duration) external {
        uint256 cost = stakingCosts[duration];
        require(cost > 0, "Invalid staking duration");

        StakingInfo storage info = stakingInfo[msg.sender];
        require(info.amount == 0, "Already staking");

        aisToken.transferFrom(msg.sender, address(this), cost); // Update this line to use aisToken
        info.amount = cost;
        info.startTime = block.timestamp;
        info.duration = duration;

        uint256 nftDuration = uint256(duration);
        nftContract.mintNFT(msg.sender, nftDuration);
        emit Staked(msg.sender, cost, duration);
}

function unstake() external {
    StakingInfo storage info = stakingInfo[msg.sender];
    require(info.amount > 0, "No staked tokens");

    uint256 durationInSeconds;
    if (info.duration == StakingDuration.OneMonth) {
        durationInSeconds = ONE_MONTH;
    } else if (info.duration == StakingDuration.ThreeMonths) {
        durationInSeconds = THREE_MONTHS;
    } else if (info.duration == StakingDuration.SixMonths) {
        durationInSeconds = SIX_MONTHS;
    } else {
        durationInSeconds = TWELVE_MONTHS;
    }

    require(block.timestamp >= info.startTime.add(durationInSeconds), "Staking period not over");

    uint256 amountToReturn = info.amount.mul(100 - PERCENTAGE_TO_BURN).div(100);
    uint256 amountToBurn = info.amount.sub(amountToReturn);

    aisToken.transfer(msg.sender, amountToReturn); // Update this line to use aisToken
    aisToken.transfer(burnAddress, amountToBurn); // Update this line to use aisToken

    delete stakingInfo[msg.sender];

    emit Unstaked(msg.sender, amountToReturn);
}

function updateStakingCost(StakingDuration duration, uint256 newCost) external onlyOwner {
    require(newCost > 0, "Invalid staking cost");

    stakingCosts[duration] = newCost;
    emit StakingCostUpdated(duration, newCost);
}

function getUserStakingInfo(address user) external view returns (uint256 amount, uint256 startTime, StakingDuration duration) {
StakingInfo storage info = stakingInfo[user];
return (info.amount, info.startTime, info.duration);
}

function getStakingCost(StakingDuration duration) external view returns (uint256) {
    return stakingCosts[duration];
}
}