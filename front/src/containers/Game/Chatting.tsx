import styles from "./game.module.scss";

export default function Chatting() {
  return (
    <div className={styles.chatBox}>
      <div className={styles.chatLog}>나는채팅로그</div>
      <div className={styles.chatInput}>나는채팅창</div>
    </div>
  );
}
