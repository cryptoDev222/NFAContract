require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("@nomiclabs/hardhat-etherscan");

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

require("dotenv").config();
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const { utils } = require("ethers");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVATE_KEY_LOCAL = process.env.PRIVATE_KEY_LOCAL;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.6.2",
        settings: {}
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        }
      },
    ]
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
        blockNumber: 12766421,
      },
      gasPrice: parseInt(utils.parseUnits("20", "gwei"))
    },
    mainnet: {
      url: `https://eth.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`],
      timeout: 150000,
      gasPrice: parseInt(utils.parseUnits("25", "gwei"))
    },
    kovan: {
      url: `https://eth-kovan.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    local: {
      url: `http://localhost:7545`,
      accounts: [`0x${PRIVATE_KEY_LOCAL}`]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN
  }
};
