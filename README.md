# Krypt - Web 3.0 Blockchain Application

![Krypt](https://i.ibb.co/DVF4tNW/image.png)

## Introduction

Welcome to the code repository for **Krypt - Web 3.0 Blockchain Application**. In this project, I learned how to build a Web 3.0 application from scratch using **React**, **Solidity**, **Hardhat**, **Tailwind CSS**, and **MetaMask**. This is the result of following the video tutorial on the **JS Mastery YouTube channel**, where I gained valuable insights into **blockchain development** and **smart contract deployment**.

You can find the full tutorial on the JS Mastery channel: [JS Mastery YouTube](https://youtu.be/Wn_Kb3MR_cU?si=lQLvnqgamST2TuB9)

## About the Project

**Krypt** is a blockchain-based application where users can store and view transactions securely using smart contracts on the Ethereum network. The project utilizes a **smart contract** written in **Solidity**, which is deployed using **Hardhat**, and interacts with a **React frontend** using **MetaMask** for wallet integration.

### Tools & Technologies Used:

- **Frontend**:

  - **React**: A JavaScript library for building user interfaces.
  - **Tailwind CSS**: A utility-first CSS framework for styling.
  - **MetaMask**: A browser extension that serves as a crypto wallet to interact with the Ethereum blockchain.

- **Backend (Blockchain)**:
  - **Solidity**: A programming language used to write smart contracts for the Ethereum blockchain.
  - **Hardhat**: A development environment and framework for Ethereum, used for smart contract testing, deployment, and debugging.
  - **Ethereum**: The blockchain where the smart contract is deployed.
- **Tools & Libraries**:
  - **Ethers.js**: A library used to interact with the Ethereum blockchain.
  - **dotenv**: To manage environment variables like API keys securely.

## Features:

- Add transactions to the blockchain.
- View the list of transactions with details such as sender, receiver, amount, timestamp, and a custom message.
- Fully integrated with **MetaMask** for wallet connections.
- Deployed smart contracts on the **Ethereum network sepolia(TESTNET)**.

## Environment Variables.

For this project, you need to set up the following environment variables:

### client_side.

- Create a `.env` file in the client directory and add the following:

  ```bash
  VITE_GIPHY_API=<your-giphy-api-key>
  ```

### smart_contract.

- Create a .env file in the smart contract directory and add the following:

  ```bash
  ALCHEMY_KRYPT_SEPOLIA=<your-alchemy-api-key>
  ACCOUNT_MAIN=<your-main-account-private-key>
  ```

## How to Run

1. Clone this repository:

   ```bash
   git clone https://github.com/Eunum56/Krypt
   ```

2. Install dependencies: (Both)

   ```bash
   npm install
   ```

3. Compile the smart contracts:

   ```bash
   npx hardhat compile
   ```

4. Deploy the smart contracts:

   ```bash
   npx hardhat ignition deploy ignition/modules/Transaction.js --network sepolia
   ```

5. Start the frontend application:
   ```
   npm run dev
   ```

## Learning & Takeaways

I learned a lot by building this project, including:

- How to write and deploy Solidity smart contracts on the Ethereum network.
- The importance of using MetaMask for interacting with blockchain-based applications.
- How to work with React, Tailwind CSS, and Ethers.js to build a fully functional Web 3.0 frontend.
- How to use Hardhat for testing and deploying smart contracts.

This project has expanded my knowledge of Web 3.0 technologies, and I'm excited to continue exploring and building decentralized applications in the future.
