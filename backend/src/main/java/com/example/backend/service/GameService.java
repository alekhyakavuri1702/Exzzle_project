package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.backend.model.Level;
import com.example.backend.model.Player;
import com.example.backend.repository.LevelRepository;
import com.example.backend.repository.PlayerRepository;

@Service
public class GameService {
    
    @Autowired
    private LevelRepository levelRepository;
    
    @Autowired
    private PlayerRepository playerRepository;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional(readOnly = true)
    public Level getLevelById(Long levelId) {
        return levelRepository.findById(levelId)
            .orElseThrow(() -> new RuntimeException("Level not found"));
    }

    @Transactional
    public Player createPlayer(String username, String password) {
        if (playerRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }

        Player player = new Player();
        player.setUsername(username);
        player.setPassword(passwordEncoder.encode(password));
        player.setHealth(100);
        player.setCurrentLevel(1);
        player.setScore(0);

        return playerRepository.save(player);
    }

    @Transactional(readOnly = true)
    public Player authenticatePlayer(String username, String password) {
        Player player = playerRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(password, player.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        return player;
    }

    @Transactional
    public void initializePlayerProgress(Long playerId) {
        Player player = playerRepository.findById(playerId)
            .orElseThrow(() -> new RuntimeException("Player not found"));
        
        // Reset player stats for new game
        player.setHealth(100);
        player.setCurrentLevel(1);
        player.setScore(0);
        
        playerRepository.save(player);
    }

    @Transactional
    public void updatePlayerProgress(Long playerId, boolean completedLevel, int healthChange, int scoreChange) {
        Player player = playerRepository.findById(playerId)
            .orElseThrow(() -> new RuntimeException("Player not found"));

        if (completedLevel) {
            player.setCurrentLevel(player.getCurrentLevel() + 1);
        }

        int newHealth = Math.max(0, Math.min(100, player.getHealth() + healthChange));
        player.setHealth(newHealth);
        
        player.setScore(player.getScore() + scoreChange);
        
        playerRepository.save(player);
    }

    @Transactional(readOnly = true)
    public boolean verifyWordGuess(Long levelId, String word) {
        Level level = getLevelById(levelId);
        return level.getWords().stream()
            .anyMatch(w -> w.getWord().equalsIgnoreCase(word));
    }

    @Transactional(readOnly = true)
    public boolean verifyPuzzleAnswer(Long levelId, String answer) {
        Level level = getLevelById(levelId);
        return level.getPuzzles().stream()
            .anyMatch(p -> p.getAnswer().equalsIgnoreCase(answer));
    }

    @Transactional(readOnly = true)
    public int calculateWordDamage(String word) {
        // Base damage calculation based on word length
        return Math.min(100, word.length() * 10);
    }
} 