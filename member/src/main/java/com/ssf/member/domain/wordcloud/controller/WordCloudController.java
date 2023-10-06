package com.ssf.member.domain.wordcloud.controller;

import com.ssf.member.domain.wordcloud.service.WordCloudService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class WordCloudController {

    private final WordCloudService wordCloudService;

    @GetMapping("/word-cloud/{categoryKey}")
    public List<Map<String, String>> getWordCloud(@PathVariable int categoryKey) {
        return wordCloudService.getWorldCloudByCategory(categoryKey);
    }
}
