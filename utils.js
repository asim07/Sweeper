const Web3 = require('web3');
const { ethers } = require("ethers");


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

async function getBalances(ether, addresses, tokenAddress = null , provider = null) {
    const balances = {};
    console.log("get balances function triggered");
    for (const address of addresses) {
        if (tokenAddress === null) {
            // Fetch balance for native coin (Ether)\

            const balance = await ether.getBalance(address);

            // console.log(ethers.formatEther(balance));

            // balances[address] = ethers.formatEther(balance);
            balances[address] = balance;
        } else {
            // Fetch token balance (Not implemented in this example)
            // You can use ERC20 contract ABI and call the balanceOf function on the contract
            // to fetch token balances for the given tokenAddress and address.
            // This requires using the ethers.js library or a similar library to interact with smart contracts.
            // Please note that token balance retrieval involves calling the contract's methods,
            // so it will require setting up a provider and interacting with the Ethereum network.
            // For this example, I will provide a placeholder value.
            balances[address] = 'Not implemented for tokens';
        }
    }
    console.log(balances)

    return balances;
}

async function getUnspentOutputs(address) {
    // Implement fetching unspent outputs (UTXOs) for the given address
    // This function is specific to Bitcoin, not required for Ethereum
}


module.exports = {
    deriveKeyPairFromMaster,
    getBalances,
    getUnspentOutputs,
};
