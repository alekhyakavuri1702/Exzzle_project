package com.example.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Level;
import com.example.backend.service.GameService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow React dev server
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping("/levels/{levelId}")
    public ResponseEntity<Level> getLevel(@PathVariable Long levelId) {
        return ResponseEntity.ok(gameService.getLevelById(levelId));
    }

    @PostMapping("/word-guess")
    public ResponseEntity<Map<String, Object>> checkWordGuess(
            @RequestBody Map<String, Object> request) {
        Long levelId = Long.parseLong(String.valueOf(request.get("levelId")));
        String word = String.valueOf(request.get("word"));
        boolean correct = gameService.verifyWordGuess(levelId, word);
        return ResponseEntity.ok(Map.of(
            "correct", correct,
            "damage", correct ? gameService.calculateWordDamage(word) : 0
        ));
    }

    @PostMapping("/puzzle-answer")
    public ResponseEntity<Map<String, Boolean>> checkPuzzleAnswer(
            @RequestBody Map<String, Object> request) {
        Long levelId = Long.parseLong(request.get("levelId").toString());
        String answer = request.get("answer").toString();
        boolean correct = gameService.verifyPuzzleAnswer(levelId, answer);
        return ResponseEntity.ok(Map.of("correct", correct));
    }

    @PutMapping("/players/{playerId}/progress")
    public ResponseEntity<Void> updateProgress(
            @PathVariable Long playerId,
            @RequestBody Map<String, Object> request) {
        boolean completedLevel = (boolean) request.get("completedLevel");
        int healthChange = (int) request.get("healthChange");
        int scoreChange = (int) request.get("scoreChange");

        gameService.updatePlayerProgress(playerId, completedLevel, healthChange, scoreChange);
        return ResponseEntity.ok().build();
    }
} 