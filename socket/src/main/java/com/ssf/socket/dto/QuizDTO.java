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
    String question;
    String hint;
    String answer;
    String articleTitle;
    String articleContent;
}