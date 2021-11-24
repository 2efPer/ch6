import React from "react";
import Scorebox from "./Scorebox";

function Header({score,accountId, contract }) {
    return (
        <header>
            <h1 className="header__title">
                <span>Rock</span>
                <span>Paper</span>
                <span>Scissors</span>
            </h1>
            <Scorebox score_num={score} accountId={accountId} contract={contract}/>
        </header>
    )
}

export default Header;