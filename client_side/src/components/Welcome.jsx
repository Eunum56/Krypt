import React, { useContext, useState } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import Loader from "./Loader";
import { TransactionContext } from "../contextStore/TransactionContext";
import { shortAddress } from "../utils/constants";

const Input = ({ name, type, value, placeHolder, handleChange }) => (
  <input
    placeholder={placeHolder}
    type={type}
    value={value}
    step="0.00001"
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const commonClasses =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransactionData,
    handleInputChange,
    isLoading,
  } = useContext(TransactionContext);

  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { addressTo, amount, message, keyword } = formData;
    if (!addressTo || !amount || !message || !keyword) return;
    sendTransactionData();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-14 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto
            <br /> across the world
          </h1>
          <p className="text-left text-white mt-5 font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Send and Recieve cruptocurrencies
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full hover:bg-[#2546bt] cursor-pointer"
            >
              <span className="text-white font-semibold">Connect Wallet</span>
            </button>
          )}
          <h1 className="text-gradient-krypt mt-10 text-2xl max-sm:text-xl text-center mb-5">
            KRYPT PROVIDES
          </h1>
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full">
            <div className={`rounded-tl-2xl ${commonClasses}`}>Security</div>
            <div className={`max-sm:rounded-tr-2xl ${commonClasses}`}>
              Integrity
            </div>
            <div
              className={`rounded-tr-2xl max-sm:rounded-none ${commonClasses}`}
            >
              Availability
            </div>
            <div
              className={`rounded-bl-2xl max-sm:rounded-none ${commonClasses}`}
            >
              Reliability
            </div>
            <div className={`max-sm:rounded-bl-2xl ${commonClasses}`}>
              Low fees
            </div>
            <div className={`rounded-br-2xl ${commonClasses}`}>Scalability</div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-center w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              name="addressTo"
              type="text"
              value={formData.addressTo}
              placeHolder="Address To"
              handleChange={handleInputChange}
            />
            <Input
              name="amount"
              type="number"
              value={formData.amount}
              placeHolder="Amount (ETH)"
              handleChange={handleInputChange}
            />
            <Input
              name="keyword"
              type="text"
              value={formData.keyword}
              placeHolder="Keyword (GIF)"
              handleChange={handleInputChange}
            />
            <Input
              name="message"
              type="text"
              value={formData.message}
              placeHolder="Enter Message"
              handleChange={handleInputChange}
            />

            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-blue-950"
              >
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
