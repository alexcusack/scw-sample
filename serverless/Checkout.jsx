import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const Checkout = ({receiveAddress}) => {
  const [total, setTotal] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

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
    setShowQRCode(true);
  };

  const handleCancel = () => {
    setTotal('');
    setShowQRCode(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>HEADER</div>
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
            value={`http://localhost:3000/pay?amount=${total}`}
            size={256}
            level="H"
            includeMargin={true}
          />
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
    justifyContent: 'space-between'
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
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  }
};

export default Checkout;
