package com.ssf.member.domain.wordcloud.service;

import com.ssf.member.domain.wordcloud.WordCloud;
import com.ssf.member.domain.wordcloud.repository.WordCloudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class WordCloudServiceImpl implements WordCloudService {

    private final WordCloudRepository worldCloudRepository;

    @Override
    public List<Map<String, String>> getWorldCloudByCategory(int categoryKey) {
        WordCloud wordCloud = worldCloudRepository.findByCategory(getCategory(categoryKey));

        return wordCloud.getScoreBoard();
    }

    public String getCategory(int categoryKey) {
        if (categoryKey == 101) {
            return "경제";
        }

        if (categoryKey == 102) {
            return "사회";
        }

        if (categoryKey == 103) {
            return "생활/문화";
        }

        if (categoryKey == 104) {
            return "세계";
        }

        return "IT/과학";
    }
}
