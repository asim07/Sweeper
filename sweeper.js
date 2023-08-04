const { Web3 } = require('web3');
const { ethers } = require('ethers');
const {
  deriveKeyPairFromMaster,
  getBalances,
  fetchGasPrice,
} = require('./utils');
const { infuraID } = require('./config');

class Sweeper {
  constructor(masterPrivateKey, destinationAddress) {
    this.masterPrivateKey = masterPrivateKey;
    this.destinationAddress = destinationAddress;
    this.ether = new ethers.JsonRpcProvider('http://127.0.0.1:8545'); // Replace with the desired Ethereum node URL
  }

  //method to sweep Native coins
  async sweepNativeCoins(depositAddresses) {
    //method to fetch balances of the provided address
    const balances = await getBalances(this.ether, depositAddresses);
    for (const address in balances) {
      const balance = balances[address];
      if (balance > 0) {
        //method to initiate the transaction
        const tx = await this.createNativeCoinTransaction(
          address,
          this.destinationAddress,
          balance
        );
        if (tx == null) {
          console.log(
            `To low balance to transfer |${address}  : ${ethers.formatEther(
              balance.toString()
            )} ETH`
          );
        } else {
          console.log(
            `sending balance from address :  ${address}   amount : ${ethers.formatEther(
              balance.toString()
            )} ETH`
          );
        }
      }
    }
  }

  //method to sweep all ERC20 contract addresses
  async sweepERC20Tokens(erc20TokenAddresses, depositAddresses) {
    for (const tokenAddress of erc20TokenAddresses) {
      const [balances, contractNames] = await getBalances(
        this.ether,
        depositAddresses,
        tokenAddress
      );

      console.log(
        `ERC20 CONTRACT ${contractNames[tokenAddress]} balances Details`
      );
      console.log(balances);
      for (const address in balances) {
        const balance = balances[address];
        if (balance > 0) {
          const tx = await this.createTokenTransferTransaction(
            tokenAddress,
            address,
            this.destinationAddress,
            balance
          );
          console.log(
            `sending ERC20Tokens ${tokenAddress} from address :  ${address}   to ${
              this.destinationAddress
            }  amount : ${ethers.formatEther(balance.toString())}  ${
              contractNames[tokenAddress]
            } ERC20 Token`
          );
        }
      }
    }
  }

  //method to initiate transaction by genenrating wallet and send the amounts
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

    console.log('Estimated Gas Limit:', estimatedGas);

    // Subtract gas limit from tx.value directly
    let value = tx.value - ethers.parseEther(estimatedGas.toString());
    if (value > 0) {
      tx.value = value;
    } else {
      return null;
    }
    console.log('After deducting gas:', tx.value);

    // Sign and send the transaction
    const res = await wallet.sendTransaction(tx);
    return res;
  }

  //method to initiate transaction by genenrating wallet,creatinng contract objects  and call the transfer functions
  async createTokenTransferTransaction(
    tokenAddress,
    fromAddress,
    toAddress,
    amount
  ) {
    const keyPair = deriveKeyPairFromMaster(this.masterPrivateKey, fromAddress);
    const wallet = new ethers.Wallet(keyPair.privateKey, this.ether);

    const contract = new ethers.Contract(
      tokenAddress,
      ['function transfer(address to, uint256 value)'],
      wallet
    );
    const gasPrice = await fetchGasPrice(infuraID);
    const tx = await contract.transfer(toAddress, amount, {
      gasLimit: 500000,
      gasPrice: gasPrice,
    });

    return tx;
  }
}

module.exports = Sweeper;
