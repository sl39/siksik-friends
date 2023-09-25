package com.ssf.socket.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/problems")

@Slf4j
@RequiredArgsConstructor
public class ProblemSaveController {
    private final List<String> problems = new ArrayList<>();
    @MessageMapping("/create/{roomId}")
    public void loadQuiz(@DestinationVariable int roomId) {

        int N = 10; // mongoDB에서 받아올 문제 리스트 길이
        int count = 0;
        for (int i = 0; i < N; i++) {
            problems.add("문제" + count);
        }

        System.out.println(problems);
    }

}