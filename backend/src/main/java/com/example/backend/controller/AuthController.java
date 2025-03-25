package com.example.backend.controller;

import com.example.backend.model.Player;
import com.example.backend.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private GameService gameService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            Player player = gameService.authenticatePlayer(
                credentials.get("username"),
                credentials.get("password")
            );
            return ResponseEntity.ok(player);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> signup(@RequestBody Map<String, String> credentials) {
        try {
            Player player = gameService.createPlayer(
                credentials.get("username"),
                credentials.get("password")
            );
            return ResponseEntity.ok(player);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/{playerId}/start-game")
    public ResponseEntity<?> startGame(@PathVariable Long playerId) {
        try {
            gameService.initializePlayerProgress(playerId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
} 