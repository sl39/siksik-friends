package com.ssf.socket.domain;

import com.ssf.socket.dto.QuizDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@Getter
@Setter
@AllArgsConstructor
public class Quiz {
    String quizId;
    String quizDate;
    List<QuizDTO> quizSet;
}