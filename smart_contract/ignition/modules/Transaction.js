const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Transaction", (m) => {

    const TransactionContract = m.contract("Transaction", []);

    return { TransactionContract };
});