package com.ssf.socket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
public class ResultDTO {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class UserDTO {
        int ranking;
        int score;
    }
    private final Map<String, UserDTO> users = new HashMap<>();
}