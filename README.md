# Uniswap-CONTRACT
## Technology Stack & Tools

* Solidity (Writing Smart Contract)

* Javascript (React & Testing)

* Ethers (Blockchain Interaction)

* Hardhat (Development Framework)



## MyToken.sol contarct

#### Custom ERC20 token to create a liquidity pool & perform Weth-ERC20 swaps.

* Contract deployed on rinkeby test network at:

> [MyToken Contract Address](https://rinkeby.etherscan.io/address/0x00d7331513171BB41333D4De770Dc46FCCF0b556)

## uniswapLite.sol contarct

* Contract deployed on rinkeby test network at:

>  [uniswapLite Contract Address](https://rinkeby.etherscan.io/address/0xE357A8a4a3334bF8f5AA848b14563e229d9c56Ac) </br>

#### Function addLiquidityForEthAndMytoken
* lets owner add liquidity pair between MyToken & Weth  </br>
* Tx hash:- [addLiquidity](https://rinkeby.etherscan.io/tx/0x745d8ac755f09349395c7aea737da21ea7b2439d67a9aa56d46c9c8ce8a3ec96) </br>
#### Function swapTokensForExactETH
* lets users swap their MyTokens for Weth & stores the corresponding Weth into uniswapLite contract </br>
* Tx hash:- [SwapTokens](https://rinkeby.etherscan.io/tx/0x52d3e85ce6f9e54ad106e31282bc4f3ef3e745766998fd4b85a2238a6b63489e) </br>
#### Function withdrawETHStored
* lets users withdraw stored Weth for the tokens swapped </br>
* Tx hash:- [WithDrawETH](https://rinkeby.etherscan.io/tx/0xe44352ad20154b90599bc12bc4d850c5c2aa24a53d7ec81ca569021739b36897) </br>
## Requirements For Initial Setup

* Install NodeJS, should work with any node version below 16.5.0

* Install Hardhat

## Setting Up

1. Clone/Download the Repository </br>

> git clone https://github.com/majinbruce/TOKEN-VESTING-CONTRACT.git

2. Install Dependencies:

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

> npx hardhat test
  
7. verify contract

> npx hardhat verify <contract address> --constructor-args --network rinkeby