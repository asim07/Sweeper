const { ethers } = require('ethers');

// function generateAddressesFromMasterPrivateKey(masterPrivateKey, count) {

//     const mnemonic = ethers.HDNodeWallet.fromExtendedKey(masterPrivateKey);
//     console.log(mnemonic)
//     const hdNode = ethers.HDNodeWallet.fromMnemonic(mnemonic.mnemonic.phrase);
//     console.log("testing")

//     const addresses = [];
//     for (let i = 0; i < count; i++) {
//         const childNode = hdNode.derivePath(`m/44'/60'/0'/0/${i}`);
//         const wallet = new ethers.Wallet(childNode.privateKey);
//         const address = wallet.address;
//         addresses.push(address);
//     }

//     return addresses;
// }

// // Example usage:
// const masterPrivateKey = '      '; // Replace with the actual master private key
// const numAddresses = 23; // Number of addresses to generate

// const addresses = generateAddressesFromMasterPrivateKey(masterPrivateKey, numAddresses);
// console.log('Generated Addresses:', addresses);


//--------------code to generate the child public addresses-----------//

// const { ethers } = require('ethers');

// function deriveKeyPairFromMaster(masterPrivateKey) {
//     const mnemonic = ethers.Mnemonic.fromEntropy(masterPrivateKey);
//     const hdNode = ethers.HDNodeWallet.fromMnemonic(mnemonic);

//     const childNode = hdNode.derivePath("m/44'/60'/0'/0/0"); // Derive the first child node
//     const wallet = new ethers.Wallet(childNode.privateKey);

//     console.log(wallet);
//     return {
//         publicKey: wallet.address,
//         privateKey: wallet.privateKey,
//     };
// }


// // Example usage:
// const masterPrivateKey = '0x375ad145df13ed97f8ca8e27bb21ebf2a3819e9e0a06509a812db377e533def7'; // Replace with the actual master private key

// const keyPair = deriveKeyPairFromMaster(masterPrivateKey);
// console.log('Public Key:', keyPair.publicKey);
// console.log('Private Key:', keyPair.privateKey);


//----------code to when we give a private key and child public address it will return the public key and the address------------//


// const { ethers } = require('ethers');

// function getMasterPrivateKeyFromHex(privateKeyHex) {
//     const mnemonic = ethers.Mnemonic.fromEntropy(privateKeyHex);
//     const masterNode = ethers.HDNodeWallet.fromMnemonic(mnemonic);
//     return masterNode.privateKey;
// }

// function getChildKeyPairFromMaster(masterPrivateKey, childPublicAddress) {
//     console.log("working")

//     const hdNode = ethers.HDNodeWallet.fromExtendedKey(masterPrivateKey);

//     for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
//         const childNode = hdNode.derivePath(`m/44'/60'/0'/0/${i}`);
//         const wallet = new ethers.Wallet(childNode.privateKey);
//         if (wallet.address.toLowerCase() === childPublicAddress.toLowerCase()) {
//             return {
//                 publicKey: wallet.address,
//                 privateKey: wallet.privateKey,
//             };
//         }
//     }

//     throw new Error('Child public address not found.');
// }

// // Example usage:
// const masterPrivateKeyHex = '0x375ad145df13ed97f8ca8e27bb21ebf2a3819e9e0a06509a812db377e533def7'; // Repflace with the actual master private key in hexadecimal format
// const childPublicAddress = '0xc86Db4f2aBc4EF8Ba3638a3612D723BF97c4A478'; // Replace with the actual public address of the child node

// try {
//     const masterPrivateKey = getMasterPrivateKeyFromHex(masterPrivateKeyHex);
//     // console.log(masterPrivateKey)
//     const keyPair = getChildKeyPairFromMaster('xprv9s21ZrQH143K3GXBmLVVFwXwSnc2BWni2CSP8Ra7zeh71Jbk2VkMjqAJDtsjjVnjL1HAXNS6jemJRUkiweFBNJgqNpMKgtXv5H8fBZMgj2v', childPublicAddress);
//     console.log('Public Key:', keyPair.publicKey);
//     console.log('Private Key:', keyPair.privateKey);
// } catch (error) {
//     console.error(error.message);
// }

// const test = async () => {
//     let customHttpProvider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
//     const balance = await customHttpProvider.getBalance("0xfc9afb771Ee3eA34e6Ee8fA40FF0709816920E64");
//     console.log(ethers.formatEther(balance.toString()), "ETH");
//     // const balance = await customHttpProvider.balance
//     // console.log(ethers.JsonRpcApiProvider)
// }

// test();
// in nodeJs
const axios = require('axios');

async function fetchGasPrice(providerUrl) {
    try {
        const response = await axios.post(providerUrl, {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_gasPrice',
            params: [],
        });

        if (response.data && response.data.result) {
            const gasPriceWei = response.data.result;
            return gasPriceWei;
        } else {
            throw new Error('Gas price not available in the response');
        }
    } catch (error) {
        throw new Error('Error fetching gas price: ' + error.message);
    }
}

// Ethereum Mainnet Infura URL
const ethereumProviderUrl = 'https://mainnet.infura.io/v3/886780ecb0e74a5191b8fc1a507a9e5e';

// Binance Smart Chain Mainnet Infura URL
const bscProviderUrl = 'https://polygon-mainnet.infura.io/v3/886780ecb0e74a5191b8fc1a507a9e5e';

fetchGasPrice(ethereumProviderUrl)
    .then((gasPriceWei) => {
        console.log(`Ethereum Mainnet Gas Price: ${gasPriceWei} Wei`);
    })
    .catch((error) => {
        console.error('Error fetching Ethereum gas price:', error);
    });

fetchGasPrice(bscProviderUrl)
    .then((gasPriceWei) => {
        console.log(`BSC Mainnet Gas Price: ${parseInt(gasPriceWei, 16)} Wei`);
    })
    .catch((error) => {
        console.error('Error fetching BSC gas price:', error);
    });
