const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("UniswapLite", () => {
  let owner;
  let addr1;
  let addr2;

  let token;
  let TOKEN;
  let totalSupply = 1000000000;

  let UNISWAPLITE;
  let uniswapLite;

  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy the Token contract.
    TOKEN = await ethers.getContractFactory("MyToken");
    token = await TOKEN.deploy(totalSupply);
    await token.deployed();

    // Deploy the  contract.
    UNISWAPLITE = await ethers.getContractFactory("uniswapLite");
    uniswapLite = await UNISWAPLITE.deploy(token.address);
    await uniswapLite.deployed();

    //distribute tokens
    await token.transfer(uniswapLite.address, 10000);
    await token.transfer(owner.address, 10000);
    await token.transfer(addr1.address, 10000);
    await token.approve(uniswapLite.address, 5000);
    await token.connect(addr1).approve(uniswapLite.address, 5000);

    await token.approve(owner.address, 5000);
    const amountToken = 100;
    const amountTokenMin = 100;
    const amountETHMin = ethers.utils.parseEther("2.0");
    const deadline = 6969;

    await uniswapLite.addLiquidityForEthAndMytoken(
      amountToken,
      amountTokenMin,
      amountETHMin,
      deadline,
      { value: ethers.utils.parseEther("2.0") }
    );
  });
  describe("liquidity", () => {
    it("Should add liquidity", async function () {
      const amountToken = 100;
      const amountTokenMin = 80;
      const amountETHMin = ethers.utils.parseEther("2.0");
      const deadline = 6969;

      await uniswapLite.addLiquidityForEthAndMytoken(
        amountToken,
        amountTokenMin,
        amountETHMin,
        deadline,
        { value: ethers.utils.parseEther("2.0") }
      );
    });
  });

  describe("swap", () => {
    it("Should swap tokens", async function () {
      const amountIn = 100;
      const balanceBEfore = await uniswapLite.ethStoredPerAddress(
        addr1.address
      );

      const parsedBalanceBEfore = ethers.utils.formatEther(balanceBEfore);
      await uniswapLite.connect(addr1).swapTokensForExactETH(amountIn, 777);

      const balanceAfter = await uniswapLite.ethStoredPerAddress(addr1.address);

      expect(balanceBEfore).to.not.equal(balanceAfter);
    });
  });
  describe("withdraw eth", () => {
    it("Should be able to withdraw eth", async function () {
      // const amount = ethers.utils.parseEther("1.0");
      const amountIn = 100;
      await uniswapLite.connect(addr1).swapTokensForExactETH(amountIn, 777);
      const balanceAfterSwap = await uniswapLite.ethStoredPerAddress(
        addr1.address
      );
      const balanceBeforeWithdraw = await uniswapLite.ethStoredPerAddress(
        addr1.address
      );
      
      await uniswapLite.connect(addr1).withdrawETHStored(balanceBeforeWithdraw);
      const balanceAfterWithdraw = await uniswapLite.ethStoredPerAddress(
        addr1.address
      );
      expect(balanceAfterWithdraw).to.not.equal(balanceBeforeWithdraw);
    });
  });
});
