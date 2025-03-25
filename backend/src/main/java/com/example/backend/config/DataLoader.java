package com.example.backend.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.backend.model.Boss;
import com.example.backend.model.Level;
import com.example.backend.model.Puzzle;
import com.example.backend.model.Word;
import com.example.backend.repository.LevelRepository;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private LevelRepository levelRepository;

    @Override
    public void run(String... args) {
        // Create Level 1
        Level level1 = new Level();
        level1.setName("The Vocabulary Valley");
        level1.setDifficulty(1);
        level1.setDescription("Welcome to the first challenge! Master the basic vocabulary to proceed.");

        // Create words for Level 1
        Word word1 = new Word();
        word1.setWord("algorithm");
        word1.setHint("A step-by-step procedure for solving a problem");
        word1.setDamage(80);
        word1.setLevel(level1);

        Word word2 = new Word();
        word2.setWord("variable");
        word2.setHint("A container for storing data values");
        word2.setDamage(80);
        word2.setLevel(level1);

        level1.setWords(Arrays.asList(word1, word2));

        // Create puzzle for Level 1
        Puzzle puzzle1 = new Puzzle();
        puzzle1.setQuestion("I am a sequence of instructions that computers follow. What am I?");
        puzzle1.setAnswer("program");
        puzzle1.setHint("Think about what you write to make a computer do something");
        puzzle1.setDifficulty(1);
        puzzle1.setLevel(level1);

        level1.setPuzzles(Arrays.asList(puzzle1));

        // Create boss for Level 1
        Boss boss1 = new Boss();
        boss1.setName("Syntax Error");
        boss1.setHealth(200);
        boss1.setAttackPower(20);
        boss1.setDescription("A fearsome creature that feeds on coding mistakes!");
        boss1.setLevel(level1);

        level1.setBoss(boss1);

        levelRepository.save(level1);

        // Create Level 2
        Level level2 = new Level();
        level2.setName("The Function Forest");
        level2.setDifficulty(2);
        level2.setDescription("Deep in the forest of functions, new challenges await!");

        // Create words for Level 2
        Word word3 = new Word();
        word3.setWord("inheritance");
        word3.setHint("When a class acquires properties from another class");
        word3.setDamage(100);
        word3.setLevel(level2);

        Word word4 = new Word();
        word4.setWord("polymorphism");
        word4.setHint("Many forms - one interface, multiple implementations");
        word4.setDamage(120);
        word4.setLevel(level2);

        level2.setWords(Arrays.asList(word3, word4));

        // Create puzzle for Level 2
        Puzzle puzzle2 = new Puzzle();
        puzzle2.setQuestion("I let you use the same name for different tasks. What programming concept am I?");
        puzzle2.setAnswer("overloading");
        puzzle2.setHint("Think about methods with the same name but different parameters");
        puzzle2.setDifficulty(2);
        puzzle2.setLevel(level2);

        level2.setPuzzles(Arrays.asList(puzzle2));

        // Create boss for Level 2
        Boss boss2 = new Boss();
        boss2.setName("Null Pointer");
        boss2.setHealth(300);
        boss2.setAttackPower(30);
        boss2.setDescription("The dreaded exception that crashes programs!");
        boss2.setLevel(level2);

        level2.setBoss(boss2);

        levelRepository.save(level2);
    }
} 