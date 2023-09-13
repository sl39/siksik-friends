# -*- coding: utf-8 -*-
import os
import sys
from bs4 import BeautifulSoup
from urllib.request import urlopen
from datetime import datetime, timedelta
from traceback import format_exc

# 현재 스크립트 파일의 디렉토리를 가져옴
dir = os.path.dirname(__file__)
# 상위 디렉토리에 있는 모듈을 사용하기 위해 경로 추가
# sys.path.insert(0, os.path.join(dir, '../save'))

# save 디렉토리에 있는 모듈 임포트
# import pandas_csv
# import to_es

# 네이버 뉴스 메인 페이지 URL
base_url = "http://news.naver.com/#"

# 데이터 수집 함수 정의
def collecting(base_url):
    print('실행~')
    html = urlopen(base_url)
    bsObject = BeautifulSoup(html, "html.parser")
    # # 웹 페이지 열고 데이터 읽기
    # data = urlopen(base_url).read()
    # # BeautifulSoup을 사용하여 HTML 파싱
    # soup = BeautifulSoup(data, "html.parser")
    # 뉴스 기사가 포함된 요소를 찾음
    total_data = bsObject.find_all(attrs={'class': 'main_component droppable'})
    print(total_data)
    # 현재 시간을 한국 시간으로 설정
    colect_time = str(datetime.utcnow().replace(microsecond=0) + timedelta(hours=9))[:16]

    # 뉴스 데이터를 수집하는 루프
    for each_data in total_data:
        category = ""
        try:
            # 카테고리 정보 추출
            category = str(each_data.find_all(attrs={'class': 'tit_sec'})).split('>')[2][:-3]
        except:
            pass

        data = str(each_data.find_all(attrs={'class': 'mlist2 no_bg'}))
        news_list = data.split('<li>')

        for each_news in news_list[1:]:
            news_block = each_news.split('href="')[1]
            title = news_block.split('<strong>')[1].split('</strong>')[0]
            news_url = news_block.split('"')[0].replace("amp;", "")
            # 뉴스 기사의 HTML을 파싱
            soup2 = BeautifulSoup(urlopen(news_url).read(), "html.parser")
            article_body = str(soup2.find_all(attrs={'id': 'articleBodyContents'}))
            # 수집한 데이터를 딕셔너리에 저장
            insert_data = {"source": "naver_news",
                           "category": category,
                           "title": title,
                           "article_body": article_body,
                           "colect_time": colect_time}
            # CSV 파일에 데이터 저장
            print(insert_data)
            # pandas_csv.to_csv(insert_data)
            # Elasticsearch에 데이터 전송
            # to_es.to_elastic(insert_data)

# 데이터 수집 함수 호출
collecting(base_url)
