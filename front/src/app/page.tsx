import Image from "next/image";
import Face1 from "public/images/character/face1.png";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <h1>뿌롱뜨</h1>
      <Image src={Face1} width="" height="" alt="" />
      <div className={styles.book} />
      <div className={styles.page1} />
      <div className={styles.page2} />
      <div className={styles.page3} />
    </>
  );
}
