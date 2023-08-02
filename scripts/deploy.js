const fs = require('fs');
const { ethers, upgrades } = require('hardhat');

async function main() {
  const numContracts = 5;
  const numWallets = 6;
  const testAmount = 100000000;

  const accounts = await ethers.getSigners();
  const deployedContracts = [];

  for (let i = 1; i <= numContracts; i++) {
    const contractName = `TestToken${i}`;
    const contractSymbol = `tst${i}`;
    console.log(`Deploying contract: ${contractName} (${contractSymbol})`);

    const myToken = await ethers.deployContract('Test', [contractName, contractSymbol]);
    await myToken.waitForDeployment();
    const contractAddress = await myToken.getAddress();
    deployedContracts.push(contractAddress);
    console.log(`Contract ${contractName} deployed to: ${contractAddress}`);

    // Mint tokens to each wallet address
    for (let j = 0; j < numWallets; j++) {
      const walletAddress = accounts[j].address;
      console.log(`Minting ${testAmount} tokens to ${walletAddress}`);
      await myToken.mint(walletAddress, ethers.parseEther(testAmount.toString()));
      const balance = await myToken.balanceOf(walletAddress);
      console.log(`Balance of ${walletAddress}: ${ethers.formatEther(balance)}`);
    }
  }

  // Save deployed contract addresses to a JSON file
  fs.writeFileSync('deployedContracts.json', JSON.stringify(deployedContracts, null, 2));

  console.log('Deployed contract addresses saved to deployedContracts.json');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
