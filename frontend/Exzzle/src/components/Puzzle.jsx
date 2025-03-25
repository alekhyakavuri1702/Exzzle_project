import React, { useState } from 'react';

const Puzzle = ({ puzzle, onPuzzleSolved }) => {
    const [answer, setAnswer] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (answer.toLowerCase() === puzzle.answer.toLowerCase()) {
            setMessage('Correct! Moving to boss fight...');
            setTimeout(() => {
                onPuzzleSolved();
            }, 2000);
        } else {
            setMessage('Incorrect! Try again.');
        }
    };

    return (
        <div className="puzzle-container">
            <h2>Puzzle Challenge</h2>
            
            <div className="puzzle-question">
                <h3>Question:</h3>
                <p>{puzzle.question}</p>
            </div>
            
            {showHint && (
                <div className="hint-box">
                    <h3>Hint:</h3>
                    <p>{puzzle.hint}</p>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="puzzle-form">
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter your answer"
                    className="puzzle-input"
                />
                <button type="submit" className="submit-button">
                    Submit Answer
                </button>
            </form>
            
            <button
                onClick={() => setShowHint(true)}
                className="hint-button"
                disabled={showHint}
            >
                Show Hint
            </button>
            
            {message && (
                <div className={`message ${message.includes('Correct') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default Puzzle; 