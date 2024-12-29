import React, { useState, useEffect } from 'react';
import './Timer.scss';

const Timer = () => {
    const [selectedTime, setSelectedTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timerInterval;
        if (isRunning) {
            timerInterval = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timerInterval);
    }, [isRunning]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const startTimer = () => {
        setElapsedTime(0);
        setIsRunning(true);
    };

    return (
        <div className="timer-container">
            <label htmlFor="timeSelector">Select time (minutes):</label>
            <input
                type="number"
                id="timeSelector"
                min="1"
                max="60"
                value={selectedTime}
                onChange={(e) => setSelectedTime(parseInt(e.target.value) * 60)}
            />
            <button onClick={startTimer}>Start</button>
            <div id="timer" className={elapsedTime >= selectedTime ? 'red' : ''}>
                {formatTime(elapsedTime)}
            </div>
        </div>
    );
};

export default Timer;
