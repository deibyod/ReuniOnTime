import React, { useState } from 'react';
import './Counter.scss';

const Counter = () => {
    const [count, setCount] = useState(0);

    const formatTime = (count) => {
        const minutes = Math.floor(count / 60);
        const seconds = count % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="counter">
            <h1>Counter: {formatTime(count)}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    );
};

export default Counter;
