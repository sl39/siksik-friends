package com.ssf.socket.domain;

import com.ssf.socket.dto.QuizDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Quiz {
    String quizId;
    String quizDate;
    List<QuizDTO> quizSet;
}