package com.ssf.member.domain.wordcloud.service;

import java.util.List;
import java.util.Map;

public interface WordCloudService {

    List<Map<String, String>> getWorldCloudByCategory(int categoryKey);
}
