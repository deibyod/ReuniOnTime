import React, { useState, useEffect } from 'react';
import './App.css';
import beepSound from './beep.mp3';

function App() {
  const [timePerPerson, setTimePerPerson] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [turn, setTurn] = useState(0);
  const beep = new Audio(beepSound);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      beep.play();
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, beep]);

  const startTimer = () => {
    setTimeLeft(timePerPerson);
    setIsRunning(true);
  };

  const nextTurn = () => {
    beep.play();
    setTurn(turn + 1);
    setTimeLeft(timePerPerson);
  };

  return (
    <div className="App">
      <h1>ReuniOnTime</h1>
      <input
        type="number"
        value={timePerPerson}
        onChange={(e) => setTimePerPerson(Number(e.target.value))}
        placeholder="Tiempo por persona (segundos)"
      />
      <button onClick={startTimer}>Iniciar</button>
      <div className={`timer ${timeLeft < 10 ? 'warning' : ''}`}>
        {timeLeft} segundos
      </div>
      <button onClick={nextTurn}>Siguiente turno</button>
      <div>Turno: {turn}</div>
    </div>
  );
}

export default App;
