import Link from "next/link";
import styles from "./Profile.module.css";

export default function ProfileData() {
  const userId = 1;

  return (
    <div className={styles.profileData}>
      <div className={styles.profileNav}>
        <Link href={`/home/profile/${userId}`}>정보</Link>
        <Link href={`/home/profile/${userId}/data`}>데이터</Link>
      </div>
    </div>
  );
}
