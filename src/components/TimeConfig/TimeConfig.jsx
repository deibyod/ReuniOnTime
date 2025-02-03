import React, { useState, forwardRef, useImperativeHandle } from 'react';
import './TimeConfig.scss';

const TimeConfig = forwardRef((props, ref) => {
    const [count, setCount] = useState(0);

    const formatTime = (count) => {
        const minutes = Math.floor(count / 60);
        const seconds = count % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleInputChange = (event) => {
        let value = event.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        if (value.length > 5) {
            value = value.slice(-5); // Keep only the last 5 digits
        }
        const minutes = Math.floor(parseInt(value.slice(0, -2) || '0', 10));
        const seconds = parseInt(value.slice(-2) || '0', 10);
        if (!isNaN(minutes) && !isNaN(seconds) && minutes >= 0 && minutes < 600 && seconds >= 0 && seconds < 60) {
            setCount(minutes * 60 + seconds);
        }
    };

    useImperativeHandle(ref, () => ({
        getTime: () => count
    }));

    return (
        <div className="time-config-counter">
            <p className='configured-time'>
                <label htmlFor="time-configured-time" className='configured-time'>
                    Tiempo:
                </label>
                <input
                    id="time-configured-time"
                    type="text"
                    value={formatTime(count)}
                    onChange={handleInputChange}
                />
            </p>
            <p>
            <button className='secondary-button' onClick={() => setCount(prevCount => prevCount + 10)}>⬆ Aumentar</button>
            <button className='secondary-button' onClick={() => setCount(prevCount => Math.max(prevCount - 10, 0))}>⬇ Reducir</button>
            </p>
        </div>
    );
});

export default TimeConfig;
