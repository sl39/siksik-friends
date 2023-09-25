import MyProfileCard from "@/components/MyProfileCard";
import UpdateButton from "./UpdateButton";
import styles from "./Profile.module.scss";

export default function index() {
  return (
    <>
      <div className={styles.leftProfile}>
        <MyProfileCard />
      </div>
      <div className={styles.buttonContainer}>
        <UpdateButton />
      </div>
    </>
  );
}
