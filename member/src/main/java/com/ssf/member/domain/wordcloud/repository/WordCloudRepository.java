package com.ssf.member.domain.wordcloud.repository;

import com.ssf.member.domain.wordcloud.WordCloud;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WordCloudRepository extends MongoRepository<WordCloud, String> {

    WordCloud findByCategory(String category);
}
