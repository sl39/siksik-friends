interface Props {
  data: any;
}

export default function MyData({ data }: Props) {
  return (
    <div>
      <div>내정보 데이터{data}</div>
    </div>
  );
}
