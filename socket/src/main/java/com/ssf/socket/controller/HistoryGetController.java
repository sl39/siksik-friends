package com.ssf.socket.controller;

import com.ssf.socket.domain.History;
import com.ssf.socket.domain.HistoryMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@RestController
public class HistoryGetController {
    private final MongoTemplate mongoTemplate;

    @Autowired
    public HistoryGetController(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @PostMapping("/history")
    public History getHistory(@RequestBody int userId) {
        // "member" 컬렉션에서 userId를 이용하여 historyList를 가져옵니다.
        Query memberQuery = new Query(Criteria.where("userId").is(userId));
        HistoryMember member = mongoTemplate.findOne(memberQuery, HistoryMember.class);

        if (member == null) {
            // 사용자를 찾을 수 없을 경우 적절한 처리를 수행합니다.
            return null;
        }

        // historyList 내부의 roomId 값을 가져와서 "history" 컬렉션에서 정보를 가져옵니다.
        List<Long> historyList = member.getHistoryList();

        for (Long roomId : historyList) {
            Query historyQuery = new Query(Criteria.where("_id").is(roomId));
            History history = mongoTemplate.findOne(historyQuery, History.class);

            if (history != null) {
                return history;
            }
        }

        // roomId에 대한 정보를 찾을 수 없을 경우 적절한 처리를 수행합니다.
        return null;
    }
}

