from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd
import csv
# import pyarrow.parquet as pq

# 데이터프레임 생성
df = pd.DataFrame(columns=['category', 'date', 'title', 'content'])

# 언론사 번호 130개
company = ['001', '002', '003', '005', '006', '007', '008', '009', '011', '014', '015', '016', '018', 
           '020', '021', '022', '023', '024', '025', '028', '029', '030', '031', '032', '033', '036', '037', 
           '044', '047', '050', '052', '053', '055', '056', '057', '065', '076', '079', '081', '082', '087', '088', 
           '092', '094', '108', '109', '112', '117', '119', '123', '127', '138', '139', '144', '145', 
           '213', '214', '215', '216', '236', '241', '243', '262', '277', '293', '296', '308', 
           '310', '311', '312', '343', '346', '347', '351', '353', '356', '366', '374', '382', '396', '398', 
           '408', '409', '410', '411', '413', '415', '416', '417', '421', '422', '425', '427', 
           '433', '435', '436', '437', '438', '439', '440', '442', '445', '448', '449', '450', 
           '465', '468', '469', '470', '472', '477', '481', '584', '586', '607', '609', '629', 
           '640', '648', '654', '655', '656', '657', '658', '659', '660', '661', '662', '665', '666']


# 언론사별 기사 일련번호 : 0003519987 3백만까지 (차이 많이남)
# 0000000000 ~ 9999999999

# 마지막 번호
last_num = dict()

# 130개 언론사에 대해
for c in company:
    i = 1

    # 없는 기사
    no_article = 0
    while True:
    # 1번부터 100번 기사까지
        article_num = f"{i:010d}"

        try:
            html = urlopen(f'https://n.news.naver.com/article/{c}/{article_num}')
            bsObject = BeautifulSoup(html, "html.parser")
            last_num[c] = article_num

            # 카테고리
            news_categories = bsObject.select(".media_end_categorize_item")
            categories_lst = []
            for news_category in news_categories:
                categories_lst.append(news_category.text)
            category = categories_lst if categories_lst else ['']  

            # 날짜
            news_date = bsObject.select_one(".media_end_head_info_datestamp_time").text
            date = " ".join(news_date.strip().split()) if news_date else ''

            # 제목
            news_title = bsObject.select_one("#title_area").text
            title = " ".join(news_title.strip().split()) if news_title else ''

            # 내용
            news_content = bsObject.select_one("#newsct_article").text
            content = " ".join(news_content.strip().split()) if news_content else ''

            # DataFrame에 추가
            df.loc[len(df)] = [category, date, title, content]

            # 기사 번호 +1
            i += 1

            # 기사가 있으므로 다시 0으로
            no_article = 0

        except:
            # 없는 기사 개수 + 1
            no_article += 1
            continue
        
        # 없는 기사가 연속으로 100개인 경우, 해당 언론사의 크롤링 멈춰
        if no_article == 100:
            break

# df -> 뉴스 데이터, last_num -> 언론사별 마지막 기사 번호가 저장된 딕셔너리 (언론사 : 마지막 기사번호)
