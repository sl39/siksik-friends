import Image from "next/image";
import type { User, soketUser } from "@/types";
import styles from "./game.module.scss";

interface Props {
  data: soketUser;
}

export default function UserItem({ data }: Props) {
  return (
    <div className={styles.userItem}>
      {/* <Image
        className={styles.profile}
        src={data?.profile || "/images/character/rabbit.png"}
        alt="프로필"
        fill
        sizes="50%"
        priority
        quality={100}
      /> */}
      <div className={styles.userItemBox}>
        {/* <div className={styles.subBox}>{data.level}</div> */}
        <div className={styles.subBox}>{data.userName}</div>
      </div>
    </div>
  );
}
