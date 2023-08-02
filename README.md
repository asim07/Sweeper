# Sweeper Project

The Sweeper project simplifies the process of sweeping native coins and ERC20 tokens from child key pairs generated from a master BIP32 address. Leveraging the power of Hardhat, it creates a mock environment to load addresses with ether and ERC20 tokens, facilitating the deployment and management of wallets with these assets.

## Installation

Ensure you have Node.js version 16 or above installed on your system. To set up the Sweeper project, follow these steps:

1. Clone the Sweeper repository.
2. Navigate to the project directory and run the following command to install dependencies:

```bash
npm install
```

In case you encounter an error related to OpenZeppelin, resolve it by adding the required package using Yarn:

```bash
yarn add @openzeppelin/hardhat-upgrades
```

## Configuration

Modify the `config.js` file according to your requirements:

- `masterBIP32Key`: The root BIP32 key to use for generating child key pairs.
- `depositAddresses`: Addresses where tokens and coins are expected to be found.
- `destinationAddress`: The address where all assets will be transferred.
- `erc20TokenAddresses`: ERC20 token contract addresses held by your expected wallets.
- Other relevant settings can also be adjusted in this file.

## Usage

To utilize the Sweeper project, follow these steps:

1. Start a local Hardhat node:

```bash
npx hardhat node
```

2. Deploy ERC20 mock contracts and mint tokens to child addresses:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

3. Execute the Sweeper script:

```bash
node app.js
```

## Features

- Effortlessly sweeps native coins and ERC20 tokens from child key pairs generated via a master BIP32 address.
- Creates a mock environment using Hardhat to facilitate loading of addresses with ether and ERC20 tokens.
- Offers an intuitive interface and comprehensive log outputs to monitor the sweeping process.

## Requirements

- Node.js version 16 or above.

## Contributing

We welcome contributions to the Sweeper project! Fork the repository, make enhancements, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Disclaimer:** The Sweeper project serves an educational and illustrative purpose. Use it responsibly and ensure you have the necessary permissions to perform transactions on the Ethereum blockchain. The project creators and contributors are not responsible for any misuse or unintended consequences of using this tool.
