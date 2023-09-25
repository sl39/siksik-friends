import styles from "@/containers/Profile/Profile.module.scss";
import ProfileIndex from "@/containers/Profile";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <ProfileIndex />
      </div>
      <div className={styles.right}>{children}</div>
    </div>
  );
}
