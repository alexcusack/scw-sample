import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConnectCoinbaseWallet } from './walletConnector'

const ConnectWallet = ({ onConnect }) => {
  const [connected, setConnected] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState('');
  const navigate = useNavigate();

  const handleConnectClick = () => {
    ConnectCoinbaseWallet().then(res => {
      console.log('wallet connected')
      onConnect(res[0])
      navigate('/home', { 
        state: { connected: true, ownerAddress: res[0] } 
      });
    }).catch(err => {
      console.log('error on connect')
    })
    
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Connect Wallet</h1>
      <button style={styles.button} onClick={handleConnectClick}>Connect Wallet</button>
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