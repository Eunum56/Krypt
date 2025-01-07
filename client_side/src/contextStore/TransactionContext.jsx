import { useState, useEffect, createContext } from "react";
import { TransactionABI, TransactionSCA } from "../utils/TransactionSC";
import { ethers, parseEther, BrowserProvider } from "ethers";

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

  const checkWallet = async () => {
    try {
      if (!ethereum) return alert("Install MetaMask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
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

      const transactionResponse = await signer.sendTransaction(
        transactionRequest
      );
      //   console.log(transactionResponse);

      console.log(`Transaction sent: ${transactionResponse.hash}`);
      setIsLoading(true);
      const receipt = await provider.waitForTransaction(
        transactionResponse.hash
      );
      console.log("Transaction receipt:", receipt);
      console.log(`Transaction confirmed: HASH ${receipt.hash}`);
      setIsLoading(false);

      const transactionContract = getTransactionContract(signer);
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount.toString(),
        message,
        keyword
      );

      console.log(`Smart contract transaction hash: ${transactionHash.hash}`);
      await transactionHash.wait();
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed");
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
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
