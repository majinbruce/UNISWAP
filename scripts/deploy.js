const { ethers } = require("hardhat");

async function main() {
  const totalSupply = 10000000;
  const TOKEN = await ethers.getContractFactory("MyToken");
  const token = await TOKEN.deploy(totalSupply);
  await token.deployed();

  console.log("\n token deployed at", token.address);

  const UNISWAPLITE = await ethers.getContractFactory("uniswapLite");
  const uniswapLite = await UNISWAPLITE.deploy(token.address);
  await uniswapLite.deployed();

  console.log("\n uniswapLite deployed at", uniswapLite.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
