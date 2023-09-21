import BackButton from "@/components/BackButton";
import styles from "./SignUp.module.scss";
import SwitchLogin from "./SwitchLogin";

export default function SignUp() {
  return (
    <div className={styles.container}>
      <div className={styles.forms}>
        <SwitchLogin />
      </div>

      <BackButton className={[styles.button, styles.btnAct].join(" ")} />
    </div>
  );
}
