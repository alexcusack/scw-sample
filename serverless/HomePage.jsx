import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { connected, ownerAddress } = location.state || {}; // Get state from navigation

  const transactions = []; // Placeholder for transaction navigate

  const handleChargeClick = () => {
    navigate('/checkout', { 
      state: { ownerAddress: ownerAddress } 
    });
  };


  const handleDisconnect = () => {
    // Handle the disconnect logic
    navigate('/');
  };

return (
    <div style={styles.container}>
      <Header connected={connected} ownerAddress={ownerAddress} onDisconnect={handleDisconnect} />
      <h1 style={styles.title}>Bodega</h1>
      <div style={styles.instructions}>
        <p>This app has two sides to it: the vendor and the payer.</p>
        <p>The vendor is any merchant wanting to accept payments via Base. The payer is any purchaser that receives a charge URL from the vendor.</p>
        <p>As a vendor, to create your first charge, tap Create New Charge below.</p>
      </div>
      <button style={styles.button} onClick={handleChargeClick}>Create New Charge</button>
    </div>
  );
};

/* 

  <div style={styles.transactionHistory}>
    <h2>Transaction History</h2>
    {transactions.length === 0 ? (
      <p>No transactions yet.</p>
    ) : (
      // Map through transactions and display them
      transactions.map((transaction, index) => (
        <div key={index} style={styles.transaction}>
          {Transaction details}
        </div>
      ))
    )}
  </div>
*/

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f7f7',
    minHeight: '100vh',
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
  instructions: {
    maxWidth: '600px',
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'left',
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

export default HomePage;