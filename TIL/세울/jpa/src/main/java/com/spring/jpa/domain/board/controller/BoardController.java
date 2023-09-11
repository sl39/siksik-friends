package com.spring.jpa.domain.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardController {
    @GetMapping("/board/write")
    public String writeBoard(){
        return "BoardWrite";
    }

    @PostMapping("/board/writedo")
    public String writeDoBoard(String id, String pw){
        System.out.println("아무거나");
        System.out.println("title: " + id);
        System.out.println("content: " + pw);
        return "BoardRecieve";
    }
}
