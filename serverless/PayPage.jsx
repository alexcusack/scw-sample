import React from 'react';

const PayPage = () => {
  // Function to parse URL query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const receiveAddress = queryParams.get('receiveAddress');
  const amount = queryParams.get('amount');
  const currency = queryParams.get('currency');

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h1>Payment Receipt</h1>
      <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <p><strong>Receive Address:</strong> {receiveAddress || 'N/A'}</p>
        <p><strong>Amount:</strong> {amount || 'N/A'} {currency || 'USD'}</p>
      </div>
      <button 
        onClick={() => alert('Payment Processed')}
        style={{ padding: '10px 20px', fontSize: '16px', color: 'white', background: 'blue', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PayPage;
