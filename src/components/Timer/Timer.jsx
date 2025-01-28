import React, { useState, useEffect, useRef } from 'react';
import './Timer.scss';
import TimeConfig from '../TimeConfig/TimeConfig';

const Timer = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timeConfigRef = useRef();

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

    const getTimeFromConfig = () => {
        const time = timeConfigRef.current.getTime();
        setElapsedTime(0);
        setIsRunning(true);
    };

    return (
        <div className="timer-container">
            <TimeConfig ref={timeConfigRef} />
            <button className='primary-button' onClick={getTimeFromConfig}>▶ Empezar</button>
            <div id="timer" className={elapsedTime >= timeConfigRef.current?.getTime() ? 'red' : ''}>
                {formatTime(elapsedTime)}
            </div>
        </div>
    );
};

export default Timer;
