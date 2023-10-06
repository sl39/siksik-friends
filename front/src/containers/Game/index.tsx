import Image from "next/image";
import SimpleMyProfile from "./SimpleMyProfile";
import Chatting from "./Chatting";
import GameRoom from "./GameRoom";
import WaitingUser from "./WaitingUser";
import styles from "./game.module.scss";

export default function Index() {
  return (
    <>
      <div id="game-modal" className="z-99" />
      <div className={`${styles.left} z-10`}>
        <div className={styles.GameRoom}>
          <GameRoom />
        </div>
        <div className={`${styles.chatBox}`}>
          <Chatting />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.waitingBox}>
          <WaitingUser />
        </div>
        <div className={styles.profileItem}>
          <SimpleMyProfile />
        </div>
      </div>
      <div className={`${styles.backImage} z-1`}>
        <Image
          src="/images/actor/dodo3.png"
          alt="배경이미지"
          sizes="30vw"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </>
  );
}
