import React, { useState, Dispatch, SetStateAction } from "react";
import { TezosToolkit } from "@taquito/taquito";

const AddressInput = ({
  Tezos,
  setUserBalance,
  userAddress,
}: {
  Tezos: TezosToolkit;
  setUserBalance: Dispatch<SetStateAction<number>>;
  userAddress: string;
}): JSX.Element => {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendTransfer = async (): Promise<void> => {
    if (recipient) {
      setLoading(true);
      try {
        // const op = await Tezos.wallet
        //   .transfer({ to: recipient, amount: parseInt(amount) })
        //   .send();
        // await op.confirmation();
        setRecipient("");
        //setAmount("");
        // const balance = await Tezos.tz.getBalance(userAddress);
        // setUserBalance(balance.toNumber());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        console.log(recipient);
      }
    }
  };

  return (
    <div id="address-inputs">
      <input
        type="text"
        placeholder="Type Address"
        value={recipient}
        onChange={e => setRecipient(e.target.value)}
      />
      {/* <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      /> */}
      <button
        className="buttonSmall"
        disabled={!recipient}
        onClick={sendTransfer}
      >
        {loading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
          </span>
        ) : (
          <span>
            Load
          </span>
        )}
      </button>
    </div>
  );
};

export default AddressInput;
