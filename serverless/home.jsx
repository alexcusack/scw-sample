import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { connected, ownerAddress } = location.state || {}; // Get state from navigation

  const transactions = []; // Placeholder for transaction navigate

  const handleChargeClick = () => {
    navigate('/scw-sample/checkout');
  };

  // Function to format the owner address
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  };

  return (
    <div style={styles.container}>
      {ownerAddress && (
        <div style={styles.pill}>
          {connected && (
            <span style={styles.connectedIcon}>
              ✔
            </span>
          )}
          {formatAddress(ownerAddress)}
        </div>
      )}
      <h1 style={styles.title}>Home</h1>
      <div style={styles.transactionHistory}>
        <h2>Transaction History</h2>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          // Map through transactions and display them
          transactions.map((transaction, index) => (
            <div key={index} style={styles.transaction}>
              {/* Transaction details */}
            </div>
          ))
        )}
      </div>
      <button style={styles.button} onClick={handleChargeClick}>Charge</button>
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
    justifyContent: 'space-between',
    position: 'relative', // Added for absolute positioning of the pill
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  transactionHistory: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  transaction: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
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
  pill: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  connectedIcon: {
    width: '20px',
    height: '20px',
    display: 'inline-block',
    borderRadius: '50%',
    backgroundColor: '#28a745',
    color: '#fff',
    textAlign: 'center',
    lineHeight: '20px',
    marginRight: '10px',
    fontSize: '12px',
  },
};

export default Home;
