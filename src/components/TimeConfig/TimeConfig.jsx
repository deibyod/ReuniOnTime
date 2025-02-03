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
        const value = event.target.value;
        const timeParts = value.split(':');
        if (timeParts.length === 2) {
            const [minutes, seconds] = timeParts.map(Number);
            if (!isNaN(minutes) && !isNaN(seconds) && minutes >= 0 && seconds >= 0 && seconds < 60) {
                setCount(minutes * 60 + seconds);
            }
        }
    };

    useImperativeHandle(ref, () => ({
        getTime: () => count
    }));

    return (
        <div className="time-config-counter">
            <label htmlFor="time-configured-time" className='configured-time'>
                Tiempo: 
            </label>
            <input 
                id="time-configured-time" 
                type="text" 
                value={formatTime(count)} 
                onChange={handleInputChange} 
            />
            <button className='secondary-button' onClick={() => setCount(prevCount => Math.min(prevCount + 10, 3600))}>⬆ Aumentar</button>
            <button className='secondary-button' onClick={() => setCount(Math.max(count - 10, 0))}>⬇ Reducir</button>
        </div>
    );
});

export default TimeConfig;
