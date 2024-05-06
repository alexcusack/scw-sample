'use client'

import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import { useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { config } from './config';
import FormAndQRComponent from './FormComponent'
import Web3 from 'web3'

const APP_NAME = 'Guest Checkout'
const APP_LOGO_URL = 'https://www.creativefabrica.com/wp-content/uploads/2022/04/17/Pizza-Logo-Design-Graphics-29132095-1-1-580x387.jpg'
const DEFAULT_ETH_JSONRPC_URL = "https://sepolia.base.org"
const DEFAULT_CHAIN_ID = 1



function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
 
  const [state, updateState] = useState({
    connected: false,
    address: null
  });
 
  function handleClick() {
    const coinbaseWallet = new CoinbaseWalletSDK({
      appName: APP_NAME,
      appLogoUrl: APP_LOGO_URL,
      darkMode: false
    }) 
    const provider = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)  
    provider.on('connect', (info) => {
      console.log('connect', info )
      // setConnect(info);
    });

    provider.on('disconnect', (error) => {
      console.log('disconnect', error )
      // setDisconnect({ code: error.code, message: error.message });
    });

    provider.on('accountsChanged', (accounts) => {
      console.log('accountsChanged', accounts )
      // setAccountsChanged(accounts);
    });

    provider.on('chainChanged', (chainId) => {
      console.log('chainChanged', chainId )
      // setChainChanged(chainId);
    });

    provider.on('message', (message) => {
      console.log('message', message )
      // setMessage(message);
    });
    const web3 = new Web3(provider)
    provider.request({ method: 'eth_requestAccounts' }).then(response => {
      console.log(`User's address is ${response}`)
      updateState({
        connected: true,
        address: response
      })
      // Optionally, have the default account set for web3.js
      // web3.eth.defaultAccount = accounts[0]
    })

    
  }
  // Input receive address, USDC amount, and have it generate a QR code 
  // In code I'll use the data field 
  // we would then take them to a URL with a pay button, tapping that would open their wallet 
  // and clear the transaction. 
  // this would land them on a /pay URL 
 
  return (
    <div>
      <Header title="Accept payments from anyone" />
      
      <div>
        <button onClick={handleClick}> Connect Wallet</button>
      </div>
      <div>
        <ol>
          <li>
            Connect a wallet
          </li>
          <li>
            Update the charge amount
          </li>
          <li>
            Scan the QR code or share the payment link to receive payment
          </li>
        </ol>

      </div>
      
      <div>
      { state.connected ? 
        <p key="address">
          Your receive address: {state.address ? `${state.address}` : ""}
        </p>
       : null
       }
        <FormAndQRComponent receiveAddress={state.address}/>
      </div>
    </div>
  );
}