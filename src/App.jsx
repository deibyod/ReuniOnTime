import React from 'react';
import Counter from './components/Counter/Counter';
import Timer from './components/Timer/Timer';

const App = () => {
    return (
        <div id="root">
            <Counter />
            <Timer />
            {/* ...existing code... */}
        </div>
    );
};

export default App;
