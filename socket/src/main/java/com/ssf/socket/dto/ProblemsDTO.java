package com.ssf.socket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
public class ProblemsDTO {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class ProblemDTO {
        int problemNumber;
        String problemContent;
        String problemHint;
    }
    private final Map<String, ProblemDTO> users = new HashMap<>();
}