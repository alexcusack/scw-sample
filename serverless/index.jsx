import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConnectWallet from './ConnectWallet';
import HomePage from './HomePage';
import Checkout from './Checkout';
import PayPage from './PayPage';

const App = () => {
  const [connected, setConnected] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState('');

const handleConnect = (address) => {
    setConnected(true);
    setOwnerAddress(address);
  };

  const handleDisconnect = () => {
    setConnected(false);
    setOwnerAddress('');
  };

  return (
    <Router basename="/scw-sample">
      <Routes>
        <Route path="/" element={<ConnectWallet onConnect={handleConnect} />} />
        <Route path="/home" element={<HomePage connected={connected} ownerAddress={ownerAddress} onDisconnect={handleDisconnect} />} />
        <Route path="/checkout" element={<Checkout connected={connected} ownerAddress={ownerAddress} onDisconnect={handleDisconnect} />} />
        <Route path="/pay" element={<PayPage alreadyConnected={connected} ownerAddress={ownerAddress} onDisconnect={handleDisconnect} />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));