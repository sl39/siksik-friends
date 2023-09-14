import Image from "next/image";
import Face1 from "public/images/character/face1.png";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <h1>식식프렌즈</h1>
      <Link href="/login">로그인</Link>
    </>
  );
}
