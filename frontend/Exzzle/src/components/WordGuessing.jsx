import React, { useState } from 'react';

const WordGuessing = ({ words, onWordGuessed }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');

    const currentWord = words[currentWordIndex];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (guess.toLowerCase() === currentWord.word.toLowerCase()) {
            setMessage('Correct! Great job!');
            onWordGuessed(true);
            
            if (currentWordIndex < words.length - 1) {
                setCurrentWordIndex(prev => prev + 1);
                setGuess('');
            }
        } else {
            setMessage('Incorrect! Try again.');
            onWordGuessed(false);
        }
    };

    return (
        <div className="word-guessing-container">
            <h2>Word Challenge</h2>
            <div className="hint-box">
                <h3>Hint:</h3>
                <p>{currentWord.hint}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="guess-form">
                <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Enter your guess"
                    className="guess-input"
                />
                <button type="submit" className="submit-button">
                    Submit Guess
                </button>
            </form>
            
            {message && (
                <div className={`message ${message.includes('Correct') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}
            
            <div className="progress">
                Word {currentWordIndex + 1} of {words.length}
            </div>
        </div>
    );
};

export default WordGuessing; 