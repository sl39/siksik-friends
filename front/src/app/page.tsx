import Image from "next/image";
import Face1 from "public/images/character/face1.png";

export default function Home() {
  return (
    <>
      <h1>뿌롱뜨</h1>
      <Image src={Face1} width="" height="" alt="" />
    </>
  );
}
