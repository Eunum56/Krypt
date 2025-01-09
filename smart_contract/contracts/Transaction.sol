// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Transaction {
    uint public transactionCount;

    event TransferEvent(
        address indexed from,
        address indexed to,
        uint amount,
        string message,
        uint timestamp,
        string keyword
    );

    struct TransferStruct {
        address from;
        address to;
        uint amount;
        string message;
        uint timestamp;
        string keyword;
    }

    TransferStruct[] public transactions;

    function addToBlockchain(
        address payable _to,
        uint _amount,
        string memory _message,
        string memory _keyword
    ) public {
        transactionCount += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                _to,
                _amount,
                _message,
                block.timestamp,
                _keyword
            )
        );

        emit TransferEvent(
            msg.sender,
            _to,
            _amount,
            _message,
            block.timestamp,
            _keyword
        );
    }
    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }
}
