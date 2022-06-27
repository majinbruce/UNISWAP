const { expect } = require("chai");
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
    await token.approve(uniswapLite.address, 5000);
  });

  describe("add liquidity", async function () {
    it("Should add liquidity", async function () {
      const amountToken = 1000;
      const amountTokenMin = 100;
      const amountETHMin = 1;
      const deadline = 100;

      await uniswapLite
        .connect(owner)
        .addLiquidityForEthAndMytoken(
          amountToken,
          amountTokenMin,
          amountETHMin,
          deadline,
          { value: 2 }
        );

      console.log(await uniswapLite.provider.getBalance(uniswapLite.address));
    });
  });
});
