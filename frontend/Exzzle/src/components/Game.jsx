import React, { useState, useEffect } from 'react';
import Level from './Level';
import Puzzle from './Puzzle';
import Boss from './Boss';
import WordGuessing from './WordGuessing';
import PlayerStats from './PlayerStats';

const Game = () => {
    const [gameState, setGameState] = useState({
        currentLevel: 1,
        playerHealth: 100,
        score: 0,
        currentRoom: 'puzzle', // Can be 'puzzle', 'word', or 'boss'
    });

    const [levelData, setLevelData] = useState(null);

    useEffect(() => {
        // Fetch level data when component mounts or level changes
        fetchLevelData();
    }, [gameState.currentLevel]);

    const fetchLevelData = async () => {
        try {
            const response = await fetch(`http://localhost:9090/api/levels/${gameState.currentLevel}`);
            const data = await response.json();
            setLevelData(data);
        } catch (error) {
            console.error('Error fetching level data:', error);
        }
    };

    const handleWordGuessed = (correct) => {
        if (correct) {
            setGameState(prev => ({
                ...prev,
                score: prev.score + 10,
                currentRoom: 'puzzle'
            }));
        } else {
            setGameState(prev => ({
                ...prev,
                playerHealth: prev.playerHealth - 10
            }));
        }
    };

    const handlePuzzleSolved = () => {
        setGameState(prev => ({
            ...prev,
            score: prev.score + 20,
            currentRoom: 'boss'
        }));
    };

    const handleBossDefeated = () => {
        setGameState(prev => ({
            ...prev,
            currentLevel: prev.currentLevel + 1,
            score: prev.score + 50,
            currentRoom: 'word'
        }));
    };

    if (!levelData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="game-container">
            <PlayerStats 
                health={gameState.playerHealth}
                score={gameState.score}
                level={gameState.currentLevel}
            />
            
            {gameState.currentRoom === 'word' && (
                <WordGuessing
                    words={levelData.words}
                    onWordGuessed={handleWordGuessed}
                />
            )}
            
            {gameState.currentRoom === 'puzzle' && (
                <Puzzle
                    puzzle={levelData.puzzles[0]}
                    onPuzzleSolved={handlePuzzleSolved}
                />
            )}
            
            {gameState.currentRoom === 'boss' && (
                <Boss
                    boss={levelData.boss}
                    onBossDefeated={handleBossDefeated}
                />
            )}
        </div>
    );
};

export default Game; 