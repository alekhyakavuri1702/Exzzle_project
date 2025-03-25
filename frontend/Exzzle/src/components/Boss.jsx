import React, { useState, useEffect } from 'react';

const Boss = ({ boss, onBossDefeated }) => {
    const [bossHealth, setBossHealth] = useState(boss.health);
    const [word, setWord] = useState('');
    const [message, setMessage] = useState('');
    const [isAttacking, setIsAttacking] = useState(false);

    useEffect(() => {
        if (bossHealth <= 0) {
            setMessage('Boss defeated! Moving to next level...');
            setTimeout(() => {
                onBossDefeated();
            }, 2000);
        }
    }, [bossHealth, onBossDefeated]);

    const handleAttack = (e) => {
        e.preventDefault();
        
        if (word.length < 3) {
            setMessage('Word too short! Use longer words for more damage!');
            return;
        }

        // Calculate damage based on word length
        const damage = word.length * 10;
        setBossHealth(prev => Math.max(0, prev - damage));
        setWord('');
        
        // Boss counter-attack
        setIsAttacking(true);
        setTimeout(() => {
            setIsAttacking(false);
        }, 1000);
    };

    return (
        <div className="boss-container">
            <h2>Boss Fight: {boss.name}</h2>
            
            <div className="boss-stats">
                <div className="health-bar">
                    <div 
                        className="health-fill"
                        style={{ width: `${(bossHealth / boss.health) * 100}%` }}
                    />
                </div>
                <p>Boss Health: {bossHealth}/{boss.health}</p>
            </div>
            
            <div className="boss-description">
                <p>{boss.description}</p>
            </div>
            
            <form onSubmit={handleAttack} className="attack-form">
                <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Enter a word to attack"
                    className="word-input"
                    disabled={isAttacking}
                />
                <button 
                    type="submit" 
                    className={`attack-button ${isAttacking ? 'attacking' : ''}`}
                    disabled={isAttacking}
                >
                    Attack!
                </button>
            </form>
            
            {message && (
                <div className={`message ${message.includes('defeated') ? 'success' : ''}`}>
                    {message}
                </div>
            )}
            
            {isAttacking && (
                <div className="boss-attack">
                    Boss is attacking!
                </div>
            )}
        </div>
    );
};

export default Boss; 