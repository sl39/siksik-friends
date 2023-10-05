package com.ssf.socket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class QuizDTO {
    String quizType;
    QuestionDTO question;
    String answer;
    String articleTitle;
    String articleContent;
}