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

    Integer allSolvedQuizCount;
    Integer allCorrectQuizCount;

    Integer economySolvedQuizCount;
    Integer economyCorrectQuizCount;

    Integer livingSolvedQuizCount;
    Integer livingCorrectQuizCount;

    Integer scienceSolvedQuizCount;
    Integer scienceCorrectQuizCount;

    Integer socialSolvedQuizCount;
    Integer socialCorrectQuizCount;

    Integer globalSolvedQuizCount;
    Integer globalCorrectQuizCount;


    List<History> allHistory;

}
