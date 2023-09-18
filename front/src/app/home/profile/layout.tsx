import styles from "@/containers/Profile/Profile.module.css";
import ProfileIndex from "@/containers/Profile";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  // 라우터 Path를 가지고 UserData 보내주기

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <ProfileIndex />
      </div>
      <div className={styles.right}>{children}</div>
    </div>
  );
}
