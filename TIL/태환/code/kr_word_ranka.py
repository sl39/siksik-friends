# -*- coding: utf-8 -*- 
from krwordrank.hangle import normalize
from krwordrank.word import KRWordRank
from urllib.request import urlopen
from bs4 import BeautifulSoup
import openai

OPENAI_API_KEY = "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"
openai.api_key = OPENAI_API_KEY

model = "gpt-3.5-turbo"

html = urlopen("https://n.news.naver.com/article/020/0003519318?sid=101")
bsObject = BeautifulSoup(html, "html.parser")

news_content = bsObject.select_one("#newsct_article").text
texts = " ".join(news_content.strip().split())

query = "[" + " ".join(news_content.strip().split()) + "]" + " 위 문장에서 설명 필요없고 키워드만 상위로 5개만 뽑아줘"

# print(texts)

# 메시지 설정하기
messages = [{"role": "user", "content": query}]

# # ChatGPT API 호출하기
response = openai.ChatCompletion.create(
    model = model,
    messages = messages
)

# answer = response.choices[0].message.content
# print(answer)

# # normalize를 이용하지 않으면 default는 영어나 다른 특수문자, 숫자를 제외하고 한글만 나옴
# # english=True, number=True하면 영어랑 숫자는 제외하지 않는다
# texts = [normalize(text, english=True, number=True) for text in texts]
# wordrank_extractor = KRWordRank(
#     min_count = 3, # 단어의 최소 출현 빈도수 (그래프 생성 시)
#     max_length = 10, # 단어의 최대 길이
#     verbose = True
#     )

# beta = 0.85    # PageRank의 decaying factor beta
# max_iter = 10

# keywords, rank, graph = wordrank_extractor.extract(texts, beta, max_iter)
# for i in keywords.keys():
#     print(i,keywords[i])
