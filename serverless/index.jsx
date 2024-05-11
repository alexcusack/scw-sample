// import React from 'react';
// import { HashRouter as Router, Route } from 'react-router-dom';
// import PayPage from './PayPage';
// import HomePage2 from './HomePage2'; // The main entry component for your form
// import ConnectWallet from './ConnectWallet'; // The main entry component for your form


import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConnectWallet from './ConnectWallet';
import PayPage from './PayPage';
import Home from './Home';
import Checkout from './Checkout';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" exact element={<ConnectWallet />} />
      <Route path="/scw-sample" exact element={<ConnectWallet />} />
      <Route path="/scw-sample/connect" exact element={<ConnectWallet />} />
      <Route path="/scw-sample/home" element={<Home />} />
      <Route path="/scw-sample/checkout" element={<Checkout />} />
      <Route path="/scw-sample/pay" element={<PayPage />} />
    </Routes>
  </Router>
);

const root = createRoot(document.getElementById('root'))
root.render(
<React.StrictMode>
  <App />
</React.StrictMode>
);
