const Web3 = require('web3');
const { ethers, Contract, getDefaultProvider } = require('ethers');
const Abi = require('./artifacts/contracts/Test.sol/Test.json');
const axios = require('axios');

function deriveKeyPairFromMaster(masterPrivateKey, childPublicAddress) {
    const hdNode = ethers.HDNodeWallet.fromExtendedKey(masterPrivateKey);

    for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
        const childNode = hdNode.derivePath(`m/44'/60'/0'/0/${i}`);
        const wallet = new ethers.Wallet(childNode.privateKey);
        if (wallet.address.toLowerCase() === childPublicAddress.toLowerCase()) {
            return {
                publicKey: wallet.address,
                privateKey: wallet.privateKey,
            };
        }
    }

    throw new Error('Child public address not found.');
}

async function getBalances(provider, addresses, tokenAddress = null) {
    const balances = {};
    const contractNames = {};
    for (const address of addresses) {
        if (tokenAddress === null) {
            const balance = await provider.getBalance(address);
            balances[address] = balance;
        } else {
            const contract = new Contract(tokenAddress, Abi.abi, provider);
            let balance = await contract.balanceOf(address);
            balances[address] = balance;
            contractNames[tokenAddress] = await contract.name();
        }
    }
    if (tokenAddress == null) {
        return balances;
    } else {
        return [balances, contractNames];
    }

}

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


module.exports = {
    deriveKeyPairFromMaster,
    getBalances,
    fetchGasPrice,
};
