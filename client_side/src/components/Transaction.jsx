import { useContext } from "react";
import { TransactionContext } from "../contextStore/TransactionContext";

import { dummyData, shortAddress } from "../utils/constants";
import useFetch from "../customHooks/useFetch";
const TransactionCard = ({
  addressFrom,
  addressTo,
  amount,
  message,
  keyword,
  timestamp,
  url,
}) => {
  const gifUrl = useFetch({ keyword });
  return (
    <div
      className="bg-[#181918] m-4 flex flex-1 flex-col p-3 rounded-md hover:shadow-2xl
2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px]
"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://sepolia.etherscan.io/address/${addressFrom}`}
            target="_blank"
          >
            <p className="text-white text-base">
              From : {shortAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://sepolia.etherscan.io/address/${addressTo}`}
            target="_blank"
          >
            <p className="text-white text-base">
              To : {shortAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message : {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="gif"
          className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"
        />

        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37C7D1] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transaction = () => {
  const { currentAccount, transactionsArray } = useContext(TransactionContext);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center py-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center py-2">
            Connect your account to see transactions
          </h3>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactionsArray.reverse().map((Transaction, i) => (
            <TransactionCard key={i} {...Transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
