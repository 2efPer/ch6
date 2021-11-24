import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import Claim from './components/Claim';
import SignIn from './components/SignIn';
import Game from './components/Game';

const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   // TODO: don't just fetch once; subscribe!
  //   contract.getMessages().then(setMessages);
  // }, []);

  const onSubmit = (e) => {
    // e.preventDefault();

    // const { fieldset, message, donation } = e.target.elements;

    // fieldset.disabled = true;

    // // TODO: optimistically update page with new message,
    // // update blockchain data in background
    // // add uuid to each message, so we know which one is already known
    // contract.addMessage(
    //   { text: message.value },
    //   BOATLOAD_OF_GAS,
    //   Big(donation.value || '0').times(10 ** 24).toFixed()
    // ).then(() => {
    //   contract.getMessages().then(messages => {
    //     setMessages(messages);
    //     message.value = '';
    //     donation.value = SUGGESTED_DONATION;
    //     fieldset.disabled = false;
    //     message.focus();
    //   });
    // });
  };

  const signIn = () => {
    wallet.requestSignIn(
      nearConfig.contractName,
      'NEAR Guest Book'
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <main>
      <header>
        { currentUser
          ? <div><button onClick={signOut}>Sign out</button></div>
          : <button onClick={signIn}>Sign in</button>
        }
      </header>
      { currentUser
        ? <Claim contract={contract} accountId={currentUser.accountId} onSubmit={onSubmit} currentUser={currentUser} />
        : <SignIn/>
      }
      { !!currentUser && <Game accountId={currentUser.accountId} contract={contract}/> }
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    get_paid: PropTypes.func.isRequired,
    storage_deposit: PropTypes.func.isRequired,
    get_ranks: PropTypes.func.isRequired,
    ft_balance_of: PropTypes.func.isRequired,
    storage_balance_of: PropTypes.func.isRequired,
    ft_transfer: PropTypes.func.isRequired
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
};

export default App;
