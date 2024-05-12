import React, { useState } from 'react';

const Header = ({ connected, ownerAddress, onDisconnect }) => {
  const [showFullAddress, setShowFullAddress] = useState(false);

  const handlePillClick = () => {
    setShowFullAddress(!showFullAddress);
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  };

  return (
    <div style={styles.container}>
      {ownerAddress && (
        <div style={styles.pill} onClick={handlePillClick}>
          {connected && (
            <span style={styles.connectedIcon}>
              ✔
            </span>
          )}
          {showFullAddress ? ownerAddress : formatAddress(ownerAddress)}
          {showFullAddress && (
            <button style={styles.disconnectButton} onClick={onDisconnect}>
              Disconnect
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  pill: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
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
  disconnectButton: {
    marginLeft: '10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default Header;
