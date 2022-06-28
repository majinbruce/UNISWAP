# Uniswap-CONTRACT
## Technology Stack & Tools

* Solidity (Writing Smart Contract)

* Javascript (React & Testing)

* Ethers (Blockchain Interaction)

* Hardhat (Development Framework)

#

### Description:-

#### owner can add liquidity,</br> users can deposit ERC20 token & withdraw ETH for the corresponding tokens

#### Code is split into 2 diffrent smart contracts:-

## MyToken.sol contarct

Custom ERC20 token to create a liquidity pool & perform Weth-ERC20 swaps.

* Contract deployed on rinkeby test network at:

> 0x744B80F48351C7317113CB24d9b29f6e18034382

## uniswapLite.sol contarct

#### Add liquidity,swap tokens for eth, withdraw weth  </br>


* Contract deployed on rinkeby test network at:

> 0x54cA5c2915663507692dE6C1762690c761878390

## Requirements For Initial Setup

* Install NodeJS, should work with any node version below 16.5.0

* Install Hardhat

## Setting Up

1. Clone/Download the Repository </br>

> git clone [https://github.com/majinbruce/TOKEN-VESTING-CONTRACT.git]

3. Install Dependencies:

> npm init --yes </br>

> npm install --save-dev hardhat </br>

> npm install dotenv --save </br>

3. Install Plugins:

> npm install --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai </br>

> npm install --save-dev @nomiclabs/hardhat-etherscan  </br>

> npm install @openzeppelin/contracts

4. Compile:

> npx hardhat compile

5. Migrate Smart Contracts

> npx hardhat run scripts/deploy.js --network <network-name>

6. Run Tests

> $ npx hardhat test