const { Web3 } = require('web3');
const { ethers } = require('ethers');
const { deriveKeyPairFromMaster, getBalances, getUnspentOutputs } = require('./utils');

class Sweeper {
    constructor(masterPrivateKey, destinationAddress) {
        this.masterPrivateKey = masterPrivateKey;
        this.destinationAddress = destinationAddress;
        this.ether = new ethers.JsonRpcProvider('http://127.0.0.1:8545'); // Replace with the desired Ethereum node URL
        // console.log(this.web3);
    }

    async sweepNativeCoins(depositAddresses) {
        console.log(depositAddresses)
        let i =0;
        const balances = await getBalances(this.ether, depositAddresses);
        for (const address in balances) {
            const balance = balances[address];
            if (balance > 0) {
                console.log("in loop")
                const tx = await this.createNativeCoinTransaction(address, this.destinationAddress, balance);
                // await this.broadcastTransaction(tx);
                console.log(tx);
            }
            console.log(`sending balance from address :  ${address}   amount : ${balance}`);

        }
    }

    async sweepERC20Tokens(erc20TokenAddresses) {
        for (const tokenAddress of erc20TokenAddresses) {
            const balances = await getBalances(this.web3, depositAddresses, tokenAddress);

            for (const address in balances) {
                const balance = balances[address];
                if (balance > 0) {
                    const tx = await this.createTokenTransferTransaction(tokenAddress, address, this.destinationAddress, balance);
                    await this.broadcastTransaction(tx);
                }
            }
        }
    }

    async createNativeCoinTransaction(fromAddress, toAddress, amount) {
        const keyPair = deriveKeyPairFromMaster(this.masterPrivateKey, fromAddress);
        const wallet = new ethers.Wallet(keyPair.privateKey, this.ether);

        const tx = {
            from: fromAddress,
            to: toAddress,
            value: amount,
        };

        // Estimate gas limit
        let estimatedGas = await this.ether.provider.estimateGas(tx);
        estimatedGas = Number(estimatedGas) * 0.00000002;


        console.log("Estimated Gas Limit:", estimatedGas);

        // Subtract gas limit from tx.value directly
        let value = tx.value - ethers.parseEther(estimatedGas.toString());
        if(value > 0) {
            tx.value = value;
        }else{
            return;
        }
        tx.value = tx.value - ethers.parseEther(estimatedGas.toString());
        console.log("After deducting gas:", tx.value);

        // Sign and send the transaction
        const res = await wallet.sendTransaction(tx);
        return res;
    }

    async createTokenTransferTransaction(tokenAddress, fromAddress, toAddress, amount) {
        const keyPair = deriveKeyPairFromMaster(this.masterPrivateKey, fromAddress);
        const provider = new ethers.providers.JsonRpcProvider(); // Replace with the desired Ethereum node URL
        const wallet = new ethers.Wallet(keyPair.privateKey, provider);

        const contract = new ethers.Contract(tokenAddress, ['function transfer(address to, uint256 value)'], wallet);
        const gasPrice = await this.web3.eth.getGasPrice();
        const gasLimit = await contract.estimateGas.transfer(toAddress, amount);

        const tx = await contract.transfer(toAddress, amount, {
            gasLimit: gasLimit,
            gasPrice: gasPrice,
        });

        return tx;
    }

    async broadcastTransaction(rawTransaction) {
        return this.ether.sendTransaction(rawTransaction);
    }
}

module.exports = Sweeper;
