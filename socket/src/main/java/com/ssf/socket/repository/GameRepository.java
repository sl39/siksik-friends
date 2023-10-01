package com.ssf.socket.repository;

import com.ssf.socket.domain.Quiz;

public interface GameRepository {
    void saveQuiz(Quiz quiz);
}