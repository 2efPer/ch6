import * as React from "react";
import Big from "big.js";


export const ONE_YOCTO_NEAR = "1";
export const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();
export const ONE_NEAR = Big(1).times(10 ** 24).toFixed();


export default function Claim({ accountId, contract }) {
  const [nearAddress, setNearAddress] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [userBalance, setUserBalance] = React.useState(0);
  const [storageBalance, setStorageBalance] = React.useState(null);
  const [ranks,setRanks] = React.useState([]);




  React.useEffect(() => {
    const getRanks = async () => {
      const r = await contract.get_ranks();
      setRanks(r)
    }

    const getStorageDeposit = async () => {
      const storage = await contract.storage_balance_of({
        account_id: accountId,
      });
      setStorageBalance(storage);
    };


    const getBalance = async () => {
      const balance = await contract.ft_balance_of({
        account_id: accountId,
      });
      setUserBalance(balance);
    };



    console.log(contract);
    getBalance();
    getStorageDeposit();
    getRanks();

  }, [accountId, userBalance, contract]);

  function depositStorage(to) {
    if (storageBalance == null) {
      contract.storage_deposit(
        { account_id: accountId },
        "200000000000000",
        Big(0.00125)
          .times(10 ** 24)
          .add(ONE_YOCTO_NEAR)
          .toFixed()
      );
      setStorageBalance(true);
    }
  }
  async function transferMyCoin(to, amount) {
    console.log("to amount: " +amount)
    if (storageBalance == null) {
      await depositStorage(to);
    } else {
      await contract.ft_transfer(
        {
          receiver_id: to,
          amount,
        },
        BOATLOAD_OF_GAS.toString(),
        ONE_YOCTO_NEAR
      );
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    transferMyCoin(nearAddress, amount);
  }

  function checkOthers(){
    const ret = JSON.stringify(ranks);
    alert(ret);
  }

  function onAddressChange(e) {
    setNearAddress(e.target.value);
  }

  function onAmountChange(e) {
    setAmount(e.target.value);
  }

  return (
    <main className="container transfer-main">
      <div className="transfer-card">
        <h5><a  target="_blank" href={`https://explorer.testnet.near.org/accounts/${accountId}`}>{accountId}</a> Balance: {userBalance} Scissors Coin</h5>
        <form onSubmit={onSubmit} className="transfer-form">
          <div className="row">
            <label htmlFor="exampleEmailInput">
              Near wallet address  {" "}
            </label>
            <input
              onChange={onAddressChange}
              className="u-full-width"
              name="amount"
              type="text"
              placeholder="friend.testnet"
            />
          </div>
          <div className="row">
            <label htmlFor="exampleEmailInput">Transfer Amount:</label>
            <input
              onChange={onAmountChange}
              className="u-full-width"
              name="amount"
              type="number"
            />
          </div>
          <br />
          <div className="row center-row">
            {storageBalance
              ?   <div><input className="button-primary" type="submit" value="Transfer" />
              <input className="button-primary"  onClick={checkOthers} value="Check Other Players" />
              </div>
              : <input className="button-primary" onClick={depositStorage} value="Register Wallet" />
          }
           
          </div>
        </form>
      </div>
      <div className="transfer-card">
        <p>
          Register a Wallet ,then Click your score numbers to claim your Scissor Coin!
        </p>
        {/* <form onSubmit={onBuySubmit} className="transfer-form">
          <div className="row center-row">
            <input className="button-primary" type="submit" value="GIMMEEEE!" />
          </div>
        </form> */}
      </div>
    </main>
  );
}