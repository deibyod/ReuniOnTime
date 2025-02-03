import React, { useState } from 'react';
import './App.css';
import Timer from './components/Timer/Timer';
import Avatar from './components/Avatar/Avatar';
import Footer from './components/Footer/Footer';
import Hotjar from '@hotjar/browser';
import avatarDefault from './assets/arenio.png';

const siteId = 5286657;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

function App() {
  const [avatarUrl, setAvatarUrl] = useState(() => {
    // Recuperar la URL del avatar desde localStorage
    const savedAvatar = localStorage.getItem('avatarUrl');
    return savedAvatar ? savedAvatar : avatarDefault;
  });

  return (
    <div className="App">
      <h1>ReuniOnTime</h1>
      <Avatar avatarUrl={avatarUrl} />
      <Timer avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} />
      <Footer />
    </div>
  );
}

export default App;
