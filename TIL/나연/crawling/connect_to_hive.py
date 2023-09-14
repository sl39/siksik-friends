from pyhive import hive

# Hive 서버에 연결
conn = hive.connect(host="localhost", port=10000, username="hadoop", database="default")

# 커서 생성
cursor = conn.cursor()

# 데이터베이스 목록 조회
cursor.execute("SHOW DATABASES")

# 결과 가져오기
databases = cursor.fetchall()

# 데이터베이스 목록 출력
for database in databases:
    print(database[0])

# 연결 및 커서 닫기
cursor.close()
conn.close()