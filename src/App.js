import React from 'react';
import './App.css';
import Timer from './components/Timer/Timer';
import Avatar from './components/Avatar/Avatar';

function App() {
  return (
    <div className="App">
      <h1>ReuniOnTime</h1>
      <Avatar />
      <Timer />
    </div>
  );
}

export default App;
