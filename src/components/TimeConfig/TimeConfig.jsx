import React, { useState, forwardRef, useImperativeHandle } from 'react';
import './TimeConfig.scss';

const TimeConfig = forwardRef((props, ref) => {
    const [count, setCount] = useState(0);

    const formatTime = (count) => {
        const minutes = Math.floor(count / 60);
        const seconds = count % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    useImperativeHandle(ref, () => ({
        getTime: () => count
    }));

    return (
        <div className="counter">
            <p className='configured-time'>Tiempo: <span id="timeconfig">{formatTime(count)}</span></p>
            <button className='secondary-button' onClick={() => setCount(count + 10)}>⬆ Aumentar</button>
            <button className='secondary-button' onClick={() => setCount(count - 10)}>⬇ Reducir</button>
        </div>
    );
});

export default TimeConfig;
