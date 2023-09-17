import Image from "next/image";
import styles from "./home.module.css";
export default function Profile() {
  // 데이터 페치 시 유저 정보를 불러와야 한다!!
  return (
    <div className={styles.profileContainer}>
      <div className={styles.image}>
        <Image src="" alt="캐릭터 프로필" />
      </div>
      <div className={styles.nickname}>
        <span className={styles.level}>레벨</span>닉네임
      </div>
    </div>
  );
}
