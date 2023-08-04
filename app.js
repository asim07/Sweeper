const Sweeper = require('./sweeper');

// Replace with the actual master private key and destination address in config file
const { masterPrivateKey, destinationAddress } = require('./config');

// Replace with the actual deposit addresses and ERC20 token addresses in config file
const { depositAddresses, erc20TokenAddresses } = require('./config');
const sweeper = new Sweeper(masterPrivateKey, destinationAddress);

async function main() {
    try {

        await sweeper.sweepERC20Tokens(erc20TokenAddresses, depositAddresses);
        await sweeper.sweepNativeCoins(depositAddresses);
        console.log('Sweeping completed successfully.');
    } catch (error) {
        console.error('Error occurred during sweeping:', error);
    }
}

main();
