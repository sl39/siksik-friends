package com.ssf.socket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
//@ToString
public class ReplyDTO {
    long roomId;
    Long userId;
    String answer;
    int userScore;
    String quizId;
    String quizDate;
    List<QuizDTO> quizSet;
}
