import React from 'react';
import './App.css';
import Timer from './components/Timer/Timer';
import Avatar from './components/Avatar/Avatar';
import Footer from './components/Footer/Footer';
import Hotjar from '@hotjar/browser';

const siteId = 5286657;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

function App() {
  return (
    <div className="App">
      <h1>ReuniOnTime</h1>
      <Avatar />
      <Timer />
      <Footer />
    </div>
  );
}

export default App;
