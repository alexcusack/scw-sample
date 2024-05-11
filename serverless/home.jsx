// import React from 'react';
// import { HashRouter as Router, Route } from 'react-router-dom';
// import PayPage from './PayPage';
// import HomePage2 from './HomePage2'; // The main entry component for your form
// import ConnectWallet from './ConnectWallet'; // The main entry component for your form


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConnectWallet from './ConnectWallet';
import PayPage from './PayPage';
import HomePage2 from './HomePage2';
import Checkout from './Checkout';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" exact element={<ConnectWallet />} />
      <Route path="/scw-sample" exact element={<ConnectWallet />} />
      <Route path="/scw-sample/connect" exact element={<ConnectWallet />} />
      <Route path="/scw-sample/home2" element={<HomePage2 />} />
      <Route path="/scw-sample/checkout" element={<Checkout />} />
      <Route path="/scw-sample/pay" element={<PayPage />} />
    </Routes>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
