import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ConnectCoinbaseWallet, SendUSDC } from './walletConnector';
import Header from './Header';

const PayPage = () => {
  // Function to parse URL query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const receiveAddress = queryParams.get('receiveAddress');
  const amount = queryParams.get('amount');

  const navigate = useNavigate();
  const location = useLocation();
  const { alreadyConnected, ownerAddress, handleDisconnect } = location.state || {}; // Get state from navigation
  const [connected, setConnected] = useState(alreadyConnected);
  const [senderAddress, setSenderAddress] = useState(ownerAddress);

  const handleConnectWallet = () => {
    ConnectCoinbaseWallet().then(res => {
      console.log('wallet connected', res)
      setSenderAddress(res[0])
      setConnected(true)
    }).catch(err => {
      console.log('error on connect')
    })
  };

  const handlePayment = () => {
    console.log("handle payment")
    SendUSDC(senderAddress, receiveAddress, amount)
  }
 
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
    <Header connected={connected} ownerAddress={senderAddress} onDisconnect={handleDisconnect} />
      <h1>Charge:</h1>
      <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <p><strong>Pay to:</strong> {receiveAddress || 'N/A'}</p>
        <p><strong>Amount:</strong> {amount || 'N/A'} USDC</p>
      </div>
      {
        connected ? 
        <button 
          onClick={handlePayment}
          style={{ padding: '10px 20px', fontSize: '16px', color: 'white', background: 'blue', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Pay Now
        </button> 
        :
        <button 
          onClick={handleConnectWallet}
          style={{ padding: '10px 20px', fontSize: '16px', color: 'white', background: 'blue', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Connect Wallet
        </button> 
      }
    </div>
  );
};

export default PayPage;
