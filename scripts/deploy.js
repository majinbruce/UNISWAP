const { ethers } = require("hardhat");

async function main() {
  const [owner, addr1] = await ethers.getSigners();

  const totalSupply = 10000000;
  const TOKEN = await ethers.getContractFactory("MyToken");
  const token = await TOKEN.deploy(totalSupply);
  await token.deployed();

  console.log("\n token deployed at", token.address);

  const UNISWAPLITE = await ethers.getContractFactory("uniswapLite");
  const uniswapLite = await UNISWAPLITE.deploy(token.address);
  await uniswapLite.deployed();

  console.log("\n uniswapLite deployed at", uniswapLite.address);

  //distribute tokens
  await token.transfer(uniswapLite.address, 10000);
  await token.transfer(owner.address, 10000);

  await token.transfer(addr1.address, 10000);
  console.log("tokens transferred");

  //approve uniswapLite & aadr1
  await token.approve(uniswapLite.address, 5000);
  await token.approve(owner.address, 5000);
  await token.connect(addr1).approve(uniswapLite.address, 5000);

  // add liquidity pool
  const amountToken = 100;
  const amountTokenMin = 100;
  const amountETHMin = ethers.utils.parseEther("2.0");
  const deadline = 6969;
  const amountIn = 100;

  await uniswapLite.addLiquidityForEthAndMytoken(
    amountToken,
    amountTokenMin,
    amountETHMin,
    deadline,
    { value: ethers.utils.parseEther("2.0") }
  );
  console.log("liquidity pool added");
  // swap tokens
  await uniswapLite.connect(addr1).swapTokensForExactETH(amountIn, 777);
  console.log("tokens swapped");
  // withdraw eth stored
  const balanceBeforeWithdraw = await uniswapLite.ethStoredPerAddress(
    addr1.address
  );

  await uniswapLite.connect(addr1).withdrawETHStored(balanceBeforeWithdraw);
  console.log("eth withdraww!!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
