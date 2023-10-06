package com.ssf.socket.service;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.ssf.socket.domain.History;
import com.ssf.socket.domain.HistoryMember;
import com.ssf.socket.domain.Member;
import com.ssf.socket.domain.Quiz;
import com.ssf.socket.dto.QuizDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.core.query.UpdateDefinition;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class QuizSaveService {
    private final MongoTemplate mongoTemplate;

    private final Map<String, String> categoryTable = new HashMap<>();

    private final Map<String, String> categoryCountTable = new HashMap<>();

    private final Map<String, String> categoryCorrectTable = new HashMap<>();


    @Autowired
    public QuizSaveService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
        categoryTable.put("경제", "quiz1");
        categoryTable.put("사회", "quiz2");
        categoryTable.put("생활/문화", "quiz3");
        categoryTable.put("IT/과학", "quiz4");
        categoryTable.put("세계", "quiz5");

        categoryCountTable.put("경제", "economySolvedQuizCount");
        categoryCountTable.put("사회", "socialSolvedQuizCount");
        categoryCountTable.put("생활/문화", "livingSolvedQuizCount");
        categoryCountTable.put("IT/과학", "scienceSolvedQuizCount");
        categoryCountTable.put("세계", "globalSolvedQuizCount");

        categoryCorrectTable.put("경제", "economyCorrectQuizCount");
        categoryCorrectTable.put("사회", "socialCorrectQuizCount");
        categoryCorrectTable.put("생활/문화", "livingCorrectQuizCount");
        categoryCorrectTable.put("IT/과학", "scienceCorrectQuizCount");
        categoryCorrectTable.put("세계", "globalCorrectQuizCount");
    }

    public Quiz getQuiz(String date, String collectionName) {
        Query query = new Query(Criteria.where("date").is(date));
        return mongoTemplate.findOne(query, Quiz.class, categoryTable.get(collectionName));
    }

    public  void  pushMember(int roomId, List<Member> memberList, String quizType, int allQuizCount) {


        for (Member member : memberList) {
            Query query1 = new Query(Criteria.where("userId").is(member.getUserId()));
            HistoryMember historyMember = mongoTemplate.findOne(query1, HistoryMember.class);


            if (historyMember == null) {
                HistoryMember newHistoryMember = new HistoryMember();
                newHistoryMember.setUserId(member.getUserId());
                newHistoryMember.setHistoryList(new ArrayList<>());
                mongoTemplate.save(newHistoryMember);
            }

            Query query2 = new Query(Criteria.where("userId").is(member.getUserId()));

            Update update2 = new Update();
            update2.addToSet("historyList", roomId);
            update2.inc("allSolvedQuizCount", allQuizCount);
            update2.inc("allCorrectQuizCount", member.getGameCorrect());
            update2.inc(categoryCountTable.get(quizType), allQuizCount);
            update2.inc(categoryCorrectTable.get(quizType), member.getGameCorrect());

            mongoTemplate.upsert(query2, update2, HistoryMember.class);
        }
    }

    public void pushHistory(int roomId, QuizDTO article) {

        Query query = new Query(Criteria.where("historyId").is(roomId));

        List<List<String>> articles = new ArrayList<>();

        List<String> container = new ArrayList<>();

        container.add(0, article.getArticleTitle());
        container.add(1, article.getArticleContent());

        articles.add(container);

        Update update = new Update();
        update.addToSet("articles", articles);

        mongoTemplate.upsert(query, update, History.class);

    }

    public void deleteAllHistory() {
        MongoDatabase database = mongoTemplate.getDb();
        MongoCollection<org.bson.Document> collection = database.getCollection("history");
        collection.deleteMany(new org.bson.Document());

        MongoCollection<org.bson.Document> member = database.getCollection("member");
        member.deleteMany(new org.bson.Document());
    }
}