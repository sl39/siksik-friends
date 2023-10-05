import styles from "@/containers/Profile/Profile.module.scss";
import ProfileIndex from "@/containers/Profile";
import SearchUser from "@/containers/Profile/SearchUser";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <ProfileIndex />
      </div>
      <div className={styles.right}>
        <div className={styles.search}>
          <SearchUser />
        </div>
        <div className={styles.rightBottom}>{children}</div>
      </div>
    </div>
  );
}
