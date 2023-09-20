import UserItem from "./UserItem";
import styles from "./game.module.scss";

export default function WaitingUser() {
  const userItems = [
    { id: 1, nickname: "11" },
    { id: 2, nickname: "2" },
    { id: 3, nickname: "3" },
    { id: 4, nickname: "4" },
    { id: 5, nickname: "5" },
    { id: 6, nickname: "6" },
  ];

  /** 대기실에 있는 유저 정보를 받아오는 함수. */
  // const handleWaitUser = () => {};

  /** 나의 모든 친구 정보를 받아오는 함수 */
  // const handleFrireds = () => {};

  return (
    <div className={styles.waitingBox}>
      <div className={styles.userBigBox}>
        <div className={styles.userBox}>
          {userItems.map((item) => (
            <UserItem key={item.id} />
          ))}
        </div>
      </div>
      <div className={styles.userNav}>
        <button>대기실</button>
        <button>친구</button>
      </div>
    </div>
  );
}
