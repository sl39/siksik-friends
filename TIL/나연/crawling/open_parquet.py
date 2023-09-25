import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq

table = pq.read_table('news_data.parquet')
df = table.to_pandas()
print(df.head(5))
print(df.describe())