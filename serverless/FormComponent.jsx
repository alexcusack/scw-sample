import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const ROOT_URL = window.location.host.startsWith("localhost") ? 
 'http://localhost:3000' : 
 'https://alexcusack.github.io/scw-sample/'
;

/* 
* Checkout tab
*   * Recieve address auto populates 
* 
* 
* Pay tab 
*   * Slight cleanup 
*   * Tap to complete 
* 
* Optional
*  * You can track incoming receive transactions 
*
* Next projects 
*   * SNX 
*   * scw wallet using our own root domain 
*/

const FormAndQRComponent = ({receiveAddress}) => {
  const [formData, setFormData] = useState({
    receiveAddress: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const createQRUrl = () => {
    const { receiveAddress, amount } = formData;
    return `${ROOT_URL}/pay?receiveAddress=${encodeURIComponent(receiveAddress)}&amount=${encodeURIComponent(amount)}&currency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`;
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    flexWrap: 'wrap',  // This allows items to wrap onto the next line
    alignItems: 'center',
    justifyContent: 'space-around'
  };

  const formStyle = {
    marginRight: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px', // Adds space between the form and QR code on smaller screens
    minWidth: '300px' // Minimum width to prevent form from becoming too small
  };

  const qrCodeStyle = {
    minWidth: '256px' // Minimum width to ensure the QR code is properly displayed
  };

  const urlStyle = {
    marginBottom: '10px', // Spacing between the URL display and the QR code
    color: '#333', // Color of the URL text
    padding: '10px', // Padding around the text
    border: '1px solid #ccc', // Border around the text
    borderRadius: '4px', // Rounded corners
    background: '#f9f9f9', // Background color for the URL display area
    width: 'fit-content', // Ensures the background only covers the text area
    wordWrap: 'break-word' // Ensures the URL wraps within the container if too long
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="receiveAddress" style={{ display: 'block', marginBottom: '5px' }}>Receive Address:</label>
          <input
            type="text"
            id="receiveAddress"
            name="receiveAddress"
            value={formData.receiveAddress}
            onChange={handleChange}
            style={{ padding: '8px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="amount" style={{ display: 'block', marginBottom: '5px' }}>Amount (USDC):</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            style={{ padding: '8px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}>Submit</button>
      </form>
        <div style={{textAlign: 'center'}}>
          <div style={urlStyle}>Payment link: {createQRUrl()}</div>
          <QRCode
            value={createQRUrl()}
            size={256}
            level={"H"}
            includeMargin={true}
            style={qrCodeStyle}
          />
        </div>
    </div>
  );
};

export default FormAndQRComponent;
