import React, { useState, useEffect, useRef } from 'react';
import './Timer.scss';
import TimeConfig from '../TimeConfig/TimeConfig';
import beepSound from '../../assets/beep.mp3';

const Timer = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timeConfigRef = useRef();
    const beepRef = useRef(new Audio(beepSound));

    useEffect(() => {
        let timerInterval;
        if (isRunning) {
            timerInterval = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timerInterval);
    }, [isRunning]);

    useEffect(() => {
        if (elapsedTime >= timeConfigRef.current?.getTime()) {
            beepRef.current.loop = true; // Repetir indefinidamente
            beepRef.current.play();
        }
    }, [elapsedTime]);

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

    const stopTimer = () => {
        setIsRunning(false);
        beepRef.current.pause(); // Detener el sonido
        beepRef.current.currentTime = 0; // Reiniciar el sonido
    };

    return (
        <div className="timer-container">
            <TimeConfig ref={timeConfigRef} />
            <div className="timer-controls">
                <button className='primary-button' onClick={getTimeFromConfig}>▶ Empezar</button>
                <button className='stop-button' onClick={stopTimer}>⏹ Terminar</button>
            </div>
            <div id="timer" className={elapsedTime >= timeConfigRef.current?.getTime() ? 'red' : ''}>
                {formatTime(elapsedTime)}
            </div>
        </div>
    );
};

export default Timer;
