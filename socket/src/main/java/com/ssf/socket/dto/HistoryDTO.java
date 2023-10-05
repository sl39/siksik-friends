package com.ssf.socket.dto;

import com.ssf.socket.domain.History;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
public class HistoryDTO {

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


    List<History> allHistory;

}
