package com.ssf.socket.controller;

import com.ssf.socket.domain.History;
import com.ssf.socket.domain.HistoryMember;
import com.ssf.socket.service.QuizSaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@RestController
public class HistoryController {
    private final MongoTemplate mongoTemplate;
    private final QuizSaveService quizSaveService;

    @Autowired
    public HistoryController(MongoTemplate mongoTemplate, QuizSaveService quizSaveService) {
        this.mongoTemplate = mongoTemplate;
        this.quizSaveService = quizSaveService;
    }

    @PostMapping("/socket/history")
    public History getHistory(@RequestBody int userId) {
        // "member" 컬렉션에서 userId를 이용하여 historyList를 가져옵니다.
        Query memberQuery = new Query(Criteria.where("userId").is(userId));
        HistoryMember member = mongoTemplate.findOne(memberQuery, HistoryMember.class);

        if (member == null) {
            // 사용자를 찾을 수 없을 경우 적절한 처리를 수행합니다.
            return null;
        }

        // historyList 내부의 historyId 값을 가져와서 "history" 컬렉션에서 정보를 가져옵니다.
        List<Long> historyList = member.getHistoryList();

        for (Long historyId : historyList) {
            Query historyQuery = new Query(Criteria.where("historyId").is(historyId));
            History history = mongoTemplate.findOne(historyQuery, History.class);

            if (history != null) {
                return history;
            }
        }

        // roomId에 대한 정보를 찾을 수 없을 경우 적절한 처리를 수행합니다.
        return null;
    }

    @DeleteMapping("/socket/delete")
    public String deleteHistory () {
        quizSaveService.deleteAllHistory();
        return "모든 전적 삭제";
    }
}

