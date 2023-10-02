package com.ssf.socket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
public class QuizDTO {
    String quizType;
    String question;
    String hint;
    String answer;
    String articleTitle;
    String articleContent;

    @Document(collection = "quiz1")
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Quiz1DTO {
        String quizType;
        String question;
        String hint;
        String answer;
        String articleTitle;
        String articleContent;
    }

    @Document(collection = "quiz2")
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Quiz2DTO {
        String quizType;
        String question;
        String hint;
        String answer;
        String articleTitle;
        String articleContent;
    }

    @Document(collection = "quiz3")
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Quiz3DTO {
        String quizType;
        String question;
        String hint;
        String answer;
        String articleTitle;
        String articleContent;
    }

    @Document(collection = "quiz4")
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Quiz4DTO {
        String quizType;
        String question;
        String hint;
        String answer;
        String articleTitle;
        String articleContent;
    }

    @Document(collection = "quiz5")
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Quiz5DTO {
        String quizType;
        String question;
        String hint;
        String answer;
        String articleTitle;
        String articleContent;
    }
}