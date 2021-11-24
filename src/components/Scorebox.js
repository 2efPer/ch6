import React from "react";
import Big from "big.js";


export const ONE_YOCTO_NEAR = "1";
export const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();
export const ONE_NEAR = Big(1).times(10 ** 24).toFixed();


function Scorebox({score_num,accountId, contract }) {

    async function getEarn(e) {
        const score = e.currentTarget.textContent
        if (score<=0) {
            alert("You don't have enough score!")
        }else{
            alert("you can refresh your page later to check your Scissor coin.")
            await contract.get_paid(
                {
                  account_id: accountId,
                  amount: parseInt(score),
                },
                BOATLOAD_OF_GAS
              );
        }

      }


    return (
        <div className="scorebox">
            <div className="scorebox__title">Score</div>
            <div className="scorebox__score"><button onClick={getEarn}>{score_num}</button></div>
        </div>
    )
}

export default Scorebox;