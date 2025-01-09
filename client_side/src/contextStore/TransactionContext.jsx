import { useState, useEffect, createContext } from "react";
import { TransactionABI, TransactionSCA } from "../utils/TransactionSC";
import { ethers, parseEther, BrowserProvider, formatUnits } from "ethers";

const { ethereum } = window;

export const TransactionContext = createContext();

const getTransactionContract = (signer) => {
  if (!ethereum) {
    console.error("Ethereum object not found. Install MetaMask.");
    return null;
  }

  const transactionContract = new ethers.Contract(
    TransactionSCA,
    TransactionABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    message: "",
    keyword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionsArray, setTransactionsArray] = useState([]);

  const checkWallet = async () => {
    try {
      if (!ethereum) return alert("Install MetaMask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        fetchTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum OBJECT");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Install MetaMask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum OBJECT");
    }
  };

  const handleInputChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const fetchTransactions = async () => {
    try {
      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const transactionContract = getTransactionContract(signer);
      const transactionsArrayResult =
        await transactionContract.getAllTransactions();
      const decodedTransactions = transactionsArrayResult.map((tx) => ({
        addressFrom: tx.from,
        addressTo: tx.to,
        amount: Number(formatUnits(tx.amount, 18)), // If using BigNumber, convert to string
        message: tx.message,
        timestamp: new Date(tx.timestamp.toString() * 1000).toLocaleString(), // Convert timestamp if needed
        keyword: tx.keyword,
      }));

      setTransactionsArray(decodedTransactions);
    } catch (error) {
      console.error("An error occurred while fetching transactions:", error);
    }
  };

  const sendTransactionData = async () => {
    try {
      if (!ethereum) return alert("Install MetaMask");

      const { addressTo, amount, message, keyword } = formData;

      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      const parsedAmount = parseEther(amount);

      const transactionRequest = {
        to: addressTo,
        value: parsedAmount,
      };
      setIsLoading(true);
      const transactionResponse = await signer.sendTransaction(
        transactionRequest
      );

      const receipt = await provider.waitForTransaction(
        transactionResponse.hash
      );

      const transactionContract = getTransactionContract(signer);
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount.toString(),
        message,
        keyword
      );

      await transactionHash.wait();
      setIsLoading(false);
      setFormData({
        addressTo: "",
        amount: "",
        message: "",
        keyword: "",
      });
      fetchTransactions();
    } catch (error) {
      console.error("Transaction failed:", error);
      setIsLoading(false);
      alert("Transaction failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkWallet();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        sendTransactionData,
        handleInputChange,
        transactionsArray,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
