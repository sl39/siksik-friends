package com.ssf.member.domain.wordcloud;

import jakarta.persistence.Id;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "wordcloud")
@Getter
public class WordCloud {

    @Id
    private String id;
    private String category;
    private List<Map<String, String>> scoreBoard;
}
