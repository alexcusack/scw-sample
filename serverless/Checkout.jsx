import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import Header from './Header';

const ROOT_URL = window.location.host.startsWith("localhost") ? 
 'http://localhost:1234/scw-sample' : 
 'https://alexcusack.github.io/scw-sample'
;

const Checkout = () => {
  const [total, setTotal] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const location = useLocation();
  const { ownerAddress } = location.state || {}; // Get state from navigation

  const navigate = useNavigate();
  const handleButtonPress = (value) => {
    if (value === 'A/C') {
      setTotal('');
    } else if (value === '=') {
      try {
        setTotal(eval(total).toString()); // Evaluate the total
      } catch {
        setTotal('Error');
      }
    } else {
      setTotal(total + value);
    }
  };

  const handleCharge = () => {
    const url = `${ROOT_URL}/pay?amount=${total}&receiveAddress=${ownerAddress}`;
    setQrUrl(url);
    setShowQRCode(true);
  };

  const handleCancel = () => {
    setTotal('');
    setShowQRCode(false);
    setQrUrl('');
  };

  const handleDisconnect = () => {
    // Handle the disconnect logic
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <Header connected={true} ownerAddress={ownerAddress} onDisconnect={handleDisconnect} />
      <div style={styles.header}>New Charge</div>
      <div style={styles.totalContainer}>
        <span style={styles.totalLabel}>Total:</span>
        <span style={styles.totalValue}>${total}</span>
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleCharge}>Charge</button>
        <button style={styles.button} onClick={handleCancel}>Cancel</button>
      </div>
      <div style={styles.keypad}>
        {['A/C', '00', '%', '÷', '7', '8', '9', 'X', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((key) => (
          <button
            key={key}
            style={styles.keypadButton}
            onClick={() => handleButtonPress(key)}
          >
            {key}
          </button>
        ))}
      </div>
      {showQRCode && (
        <div style={styles.qrContainer}>
          <QRCode
            value={qrUrl}
            size={256}
            level="H"
            includeMargin={true}
          />
          <div style={styles.urlContainer}>
            <p style={styles.urlText}>{qrUrl}</p>
          </div>
        </div>
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
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0'
  },
  totalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '400px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  totalLabel: {
    fontSize: '18px',
    color: '#333'
  },
  totalValue: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '400px',
    marginBottom: '20px'
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
    margin: '0 10px'
  },
  keypad: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    width: '100%',
    maxWidth: '400px'
  },
  keypadButton: {
    padding: '15px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  qrContainer: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  urlContainer: {
    marginTop: '10px',
    wordBreak: 'break-word',
  },
  urlText: {
    fontSize: '14px',
    color: '#007bff',
  },
};

export default Checkout;
