package com.ssf.socket.service;

import com.ssf.socket.repository.GameRepository;
import com.ssf.socket.repository.MemoryGameRepository;

public class QuizSaveService {
    private final GameRepository gameRepository = new MemoryGameRepository();

    public void pullQuiz() {

    }
}
