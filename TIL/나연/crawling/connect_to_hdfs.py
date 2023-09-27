import crawl_100
from hdfs import InsecureClient

df = crawl_100.news_crawl_100()

client_hdfs = InsecureClient('http://localhost:9870')

with client_hdfs.write('/df_to_csv.csv', append=False, overwrite=True, encoding='utf-8') as writer: df.to_csv(writer)

print('완료')