const addresses = require('./deployedContracts.json');

module.exports = {
    masterPrivateKey: 'xprv9s21ZrQH143K3GXBmLVVFwXwSnc2BWni2CSP8Ra7zeh71Jbk2VkMjqAJDtsjjVnjL1HAXNS6jemJRUkiweFBNJgqNpMKgtXv5H8fBZMgj2v', // Replace with your actual master private key
    destinationAddress: '0x9F20059Aa96606C64F3F0CdBfBC51A0A420A2A84', // Replace with the desired destination Ethereum address
    depositAddresses: ['0xfc9afb771Ee3eA34e6Ee8fA40FF0709816920E64', '0x182D7bcfa4c24f5FCbF1475b5F0C0D486ceC1902', '0xAA06E7E8C678f6bBbF365DBa7F0176417C929E98', '0x72319B9713E610Bfaf588B663348D83818a3B5Bf'], // Replace with actual deposit addresses
    erc20TokenAddresses: addresses, // Replace with actual ERC20 token addresses
    infuraID: 'https://mainnet.infura.io/v3/886780ecb0e74a5191b8fc1a507a9e5e' //replace with desired network link of infura
};
