"use client";

import { useAtom } from "jotai";
import { useState } from "react";
import UserItem from "@/containers/Game/UserItem";
import { userAtom } from "@/store/userAtom";
import styles from "./SimpleMyProfile.module.css";
// import styles from "./game.module.scss";
import Modal from "@/components/gameModal";
import SimpleProfileModal from "./SimpleProfileModal";
import FriendsListModal from "./FriendsListModal";
import FriendsRequestModal from "./FriendsRequestModal";

export default function SimpleProfile() {
  const [myData] = useAtom(userAtom);
  const [openProfile, setOpenProfile] = useState(false);
  const [openFriendsList, setOpenFriendsList] = useState(false);
  const [openFriendsRequest, setOpenFriendsRequest] = useState(false);

  // const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) =>{
  //   const target = e.target as HTMLDivElement
  //   console.log(target)
  //   console.log()
  //   if (target.classList.contains('modal')) {
  //     modalClose()
  //   }
  // }

  return (
    <>
      <div className={styles.myProfile}>
        <UserItem data={myData} />
      </div>
      <div className={styles.myBtn}>
        <button className={styles.button} onClick={() => setOpenProfile(!openProfile)}>
          프로필
        </button>
        <button className={styles.button} onClick={() => setOpenFriendsList(!openFriendsList)}>
          친구목록
        </button>
        <button className={styles.button} onClick={() => setOpenFriendsRequest(!openFriendsRequest)}>
          친구요청
        </button>

        <Modal isOpen={openProfile}>
          <SimpleProfileModal onClose={() => setOpenProfile(false)} />
        </Modal>
        <Modal isOpen={openFriendsList}>
          <FriendsListModal onClose={() => setOpenFriendsList(false)} />
        </Modal>
        <Modal isOpen={openFriendsRequest}>
          <FriendsRequestModal onClose={() => setOpenFriendsRequest(false)} />
        </Modal>
      </div>
    </>
  );
}
