/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: "../.env" });
require("@nomiclabs/hardhat-etherscan");

const { RINKEBY_PRIVATE_KEY, ALCHEMY_API_KEY, ETHERSCAN_API_KEY } = process.env;
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: ALCHEMY_API_KEY,
      accounts: [`0x${RINKEBY_PRIVATE_KEY}`],
    },

    hardhat: {
      forking: {
        url: ALCHEMY_API_KEY,
      },
    },
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
