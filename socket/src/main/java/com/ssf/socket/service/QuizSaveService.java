package com.ssf.socket.service;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.ssf.socket.domain.History;
import com.ssf.socket.domain.HistoryMember;
import com.ssf.socket.domain.Member;
import com.ssf.socket.domain.Quiz;
import com.ssf.socket.dto.QuizDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.core.query.UpdateDefinition;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public void pushHistory(int roomId, List<Member> memberList, QuizDTO article) {

        for (Member member : memberList) {
            Query query = new Query(Criteria.where("userId").is(member.getUserId()));

            Update update = new Update();
            update.addToSet("historyList", roomId);

            mongoTemplate.upsert(query, update, HistoryMember.class);
        }

        History history = new History(roomId, article.getArticleTitle(), article.getArticleContent());

        mongoTemplate.save(history);
    }

    public void deleteAllHistory() {
        MongoDatabase database = mongoTemplate.getDb();
        MongoCollection<org.bson.Document> collection = database.getCollection("history");
        collection.deleteMany(new org.bson.Document());

        MongoCollection<org.bson.Document> member = database.getCollection("member");
        member.deleteMany(new org.bson.Document());
    }
}