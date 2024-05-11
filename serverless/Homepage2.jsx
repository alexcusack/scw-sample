import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage2 = () => {
  const history = useNavigate();
  const transactions = []; // Placeholder for transaction history

  const handleChargeClick = () => {
    history.push('/checkout');
  };

  return (
    <div style={styles.container}>
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
};

export default HomePage2;
