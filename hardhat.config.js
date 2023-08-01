require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      accounts: {
        mnemonic: "similar latin funny cradle soda dwarf analyst raccoon arm urge call wash such amount vendor",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 25,
      },
    }
  }
};
