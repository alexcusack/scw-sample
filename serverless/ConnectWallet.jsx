import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConnectWallet = () => {
  const [connected, setConnected] = useState(false);
  const history = useNavigate();

  const handleConnectClick = () => {
    // Simulate wallet connection
    setConnected(true);
  };

  if (connected) {
    history.push('/scw-sample/home2');
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
