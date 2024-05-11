import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Provider, ConnectCoinbaseWallet } from './walletConnector'

const ConnectWallet = () => {
  const [connected, setConnected] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState('');
  const navigate = useNavigate();

  const handleConnectClick = () => {
    // Simulate wallet connection
    ConnectCoinbaseWallet().then(res => {
      console.log('wallet connected')
      console.log(res)
      setConnected(true);
      setOwnerAddress(res[0]) 
    }).catch(err => {
      console.log('error on connect')
    })
    
  };

  if (connected) {
    navigate('/scw-sample/home', { 
      state: { connected: connected, ownerAddress: ownerAddress } 
    });
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Connect Wallet</h1>
      {!connected && (
        <button style={styles.button} onClick={handleConnectClick}>Connect Wallet</button>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f7f7',
    minHeight: '100vh',
    justifyContent: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default ConnectWallet;
