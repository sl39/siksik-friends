package com.ssf.socket.repository;

import com.ssf.socket.domain.Quiz;

import java.util.HashMap;
import java.util.Map;


public class MemoryGameRepository implements GameRepository{

    public static Map<Long, Quiz> store = new HashMap<>();
    private static Long quizCount;
    @Override
    public void saveQuiz(Quiz quiz) {
        store.put(++quizCount, quiz);
    }
}
