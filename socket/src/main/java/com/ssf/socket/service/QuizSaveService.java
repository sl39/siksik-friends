package com.ssf.socket.service;

import com.ssf.socket.domain.Quiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QuizSaveService {
    private final MongoTemplate mongoTemplate;

    private final Map<String, String> categoryTable = new HashMap<>();

    @Autowired
    public QuizSaveService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
        categoryTable.put("경제", "quiz1");
        categoryTable.put("사회", "quiz2");
        categoryTable.put("생활/문화", "quiz3");
        categoryTable.put("IT/과학", "quiz4");
        categoryTable.put("세계", "quiz5");
    }

    public Quiz getQuiz(String date, String collectionName) {
        Query query = new Query(Criteria.where("date").is(date));
        return mongoTemplate.findOne(query, Quiz.class, categoryTable.get(collectionName));
    }
}
