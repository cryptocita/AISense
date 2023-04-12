#Pending issues/review:
- Purchase NFT with USDT
- Staking tokens
- Unstaking tokens
- Detecting NFTs in user wallet
- Review token, NFT and staking contracts

AISense.sol
- ERC20
- Total supply 13,000,000
- Minted upon contract deployment 10,000,000
- Can mint up to max supply of 13,000,000

AISenseNFT.sol
- ERC721
- Four NFT types
- Functions to setPrice and updatePrice of NFTs purchased using USDT
- Owner can mint NFT without staking or USDT

AISStaking.sol

- Function setStakingCost for each duration (1, 3, 6, 12 months)
- Function updateStakingCost in case of price volatility of AIS token.
- Function getUserStakingInfo to display time remaining for staking duration
- User cannot unstake until staking duration is over.
- Once user unstakes, 50% of AIS tokens are sent to burn wallet.
