import Login from "@/containers/Login/LoginModal";
import { fetchData } from "@/services/api";
import styles from "./page.module.css";

export default function Home() {
  const getData = async () => {
    try {
      const data = await fetchData("/920");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  getData();

  return (
    <div className={styles.main}>
      <div className={styles.Logo}>식식프렌즈 로고 가져오기</div>
      <Login />
    </div>
  );
}
