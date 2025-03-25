import React from 'react';
import Game from './components/Game';
// import Login from './components/Login'; // Comment out or remove this line
// import Signup from './components/Signup'; // Comment out or remove this line

function App() {
    return (
        <div className="App">
            {/* <Login /> */} {/* Comment out or remove this line */}
            {/* <Signup /> */} {/* Comment out or remove this line */}
            <Game /> {/* Directly render the Game component */}
        </div>
    );
}

export default App; 