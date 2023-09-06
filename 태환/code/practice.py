from urllib.request import urlopen
from bs4 import BeautifulSoup

html = urlopen("https://n.news.naver.com/article/666/0000020542")
bsObject = BeautifulSoup(html, "html.parser")

news_date = bsObject.select_one(".media_end_head_info_datestamp_time").text
print(" ".join(news_date.strip().split()))
print('\n')

news_title = bsObject.select_one("#title_area").text
print(" ".join(news_title.strip().split()))
print('\n')

news_content = bsObject.select_one("#newsct_article").text
print(" ".join(news_content.strip().split()))
print('\n')

news_category = bsObject.select_one(".media_end_categorize_item").text
print(" ".join(news_category.strip().split()))
