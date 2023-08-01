const Sweeper = require('./sweeper');

// Replace with the actual master private key and destination address
const { masterPrivateKey, destinationAddress } = require('./config');

// Replace with the actual deposit addresses and ERC20 token addresses
const { depositAddresses, erc20TokenAddresses } = require('./config');

const sweeper = new Sweeper(masterPrivateKey, destinationAddress);

async function main() {
    try {
        await sweeper.sweepNativeCoins(depositAddresses);
        // await sweeper.sweepERC20Tokens(erc20TokenAddresses);
        console.log('Sweeping completed successfully.');
    } catch (error) {
        console.error('Error occurred during sweeping:', error);
    }
}

main();
