import React from 'react';
import ReactDOM from 'react-dom';
import PayPage from './PayPage';
import HomePage from './HomePage'; // The main entry component for your form

const App = () => {
  // Determine which component to render based on the URL
  const currentPath = window.location.pathname;

  if (currentPath === "/pay") {
    return <PayPage />;
  } else {
    return <HomePage />;
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
