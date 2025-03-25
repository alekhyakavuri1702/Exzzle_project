import React from 'react';

const PlayerStats = ({ health, score, level }) => {
    return (
        <div className="player-stats">
            <div className="stat-item">
                <span className="stat-label">Health:</span>
                <div className="health-bar">
                    <div 
                        className="health-fill"
                        style={{ 
                            width: `${health}%`,
                            backgroundColor: health > 50 ? '#4CAF50' : health > 25 ? '#FFC107' : '#F44336'
                        }}
                    />
                </div>
                <span className="stat-value">{health}/100</span>
            </div>
            
            <div className="stat-item">
                <span className="stat-label">Level:</span>
                <span className="stat-value">{level}</span>
            </div>
            
            <div className="stat-item">
                <span className="stat-label">Score:</span>
                <span className="stat-value">{score}</span>
            </div>
        </div>
    );
};

export default PlayerStats; 