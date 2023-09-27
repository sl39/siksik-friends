import ProfileCard from "@/components/ProfileCard";
import UpdateButton from "./UpdateButton";
import styles from "./Profile.module.scss";

export default function index() {
  return (
    <>
      <div className={styles.leftProfile}>
        <ProfileCard />
      </div>
      <div className={styles.buttonContainer}>
        <UpdateButton />
      </div>
    </>
  );
}
