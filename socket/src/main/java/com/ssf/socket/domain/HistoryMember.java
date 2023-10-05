package com.ssf.socket.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "member")
public class HistoryMember {

    @Id
    Long userId;

    int allSolvedQuizCount;
    int allCorrectQuizCount;

    int economySolvedQuizCount;
    int economyCorrectQuizCount;

    int livingSolvedQuizCount;
    int livingCorrectQuizCount;

    int scienceSolvedQuizCount;
    int scienceCorrectQuizCount;

    int socialSolvedQuizCount;
    int socialCorrectQuizCount;

    int globalSolvedQuizCount;
    int globalCorrectQuizCount;

    List<Long> historyList;
}