require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path:"./config/config.env"});


module.exports = {
  solidity: "0.8.17",
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
    },
    goerli: {
      url: "https://goerli.infura.io/v3/c671003979ec46088e6c2e28a6a3a79a",
      accounts: {mnemonic:process.env.CLIENT_MNEMONIC}
    },bsctest: {
      url: "https://bsc-testnet.public.blastapi.io",
      accounts: {mnemonic:process.env.CLIENT_MNEMONIC}
    },
    bsc: {
      url: "https://bsc-dataseed1.ninicoin.io",
      accounts: {mnemonic:process.env.CLIENT_MNEMONIC}
    }
  },

    etherscan: {
      apiKey: process.env.BSCPRIVATE,
    },
  

};