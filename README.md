Uniswap-CONTRACT
Technology Stack & Tools
Solidity (Writing Smart Contract)

Javascript (React & Testing)

Ethers (Blockchain Interaction)

Hardhat (Development Framework)

MyToken.sol contarct
Custom ERC20 token to create a liquidity pool & perform Weth-ERC20 swaps.
Contract deployed on rinkeby test network at:
MyToken Contract Address

uniswapLite.sol contarct
Contract deployed on rinkeby test network at:
uniswapLite Contract Address

Function addLiquidityForEthAndMytoken
lets owner add liquidity pair between MyToken & Weth
Tx hash:- addLiquidity
Function swapTokensForExactETH
lets users swap their MyTokens for Weth & stores the corresponding Weth into uniswapLite contract
Tx hash:- SwapTokens
Function withdrawETHStored
lets users withdraw stored Weth for the tokens swapped
Tx hash:- WithDrawETH
Requirements For Initial Setup
Install NodeJS, should work with any node version below 16.5.0

Install Hardhat

Setting Up
Clone/Download the Repository
git clone https://github.com/majinbruce/TOKEN-VESTING-CONTRACT.git

Install Dependencies:
npm init --yes

npm install --save-dev hardhat

npm install dotenv --save

Install Plugins:
npm install --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai

npm install --save-dev @nomiclabs/hardhat-etherscan

npm install @openzeppelin/contracts

Compile:
npx hardhat compile

Migrate Smart Contracts
npx hardhat run scripts/deploy.js --network

Run Tests
npx hardhat test

verify contract
npx hardhat verify --constructor-args --network rinkeby
