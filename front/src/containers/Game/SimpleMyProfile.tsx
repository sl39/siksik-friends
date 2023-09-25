"use client";

import { useAtom } from "jotai";
import UserItem from "@/containers/Game/UserItem";
import { userAtom } from "@/store/userAtom";
import styles from "./SimpleMyProfile.module.css";
import { useState } from "react";
import Modal from "@/components/gameModal";
import SimpleProfileModal from "./SimpleProfileModal/SimpleProfileModal";
import FriendsList from "./SimpleProfileModal/FriendsList";
import FriendsRequest from "./SimpleProfileModal/FriendsRequest";

export default function SimpleProfile() {
  const [myData] = useAtom(userAtom);
  const [openProfile, setOpenProfile] = useState(false)
  const [openFriendsList, setOpenFriendsList] = useState(false)
  const [openFriendsRequest, setOpenFriendsRequest] = useState(false)
  
  const onClickProfile = () =>{
    setOpenProfile(!openProfile)
    setOpenFriendsList(false)
    setOpenFriendsRequest(false)
  }
  const onClicFriendsList = () =>{
    setOpenProfile(false)
    setOpenFriendsList(!openFriendsList)
    setOpenFriendsRequest(false)
  }
  
  const onClickFriendsRequest = () =>{
    setOpenProfile(false)
    setOpenFriendsList(false)
    setOpenFriendsRequest(!openFriendsRequest)
  }

  // const modalClose = () =>{
  //   setOpenProfile(false)
  //   setOpenFriendsList(false)
  //   setOpenFriendsRequest(false)
  // }

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
        <button className={styles.button} onClick={() => onClickProfile()}>프로필</button>
        <button className={styles.button} onClick={() => onClicFriendsList()}>친구목록</button>
        <button className={styles.button} onClick={() => onClickFriendsRequest()}>친구요청</button>

        {/* <div className="modal" onClick={handleModalClick}> */}
        
        <Modal isOpen={openProfile}>
        <div >
          <SimpleProfileModal/>
          </div></Modal>
        <Modal isOpen={openFriendsList}><FriendsList/></Modal>
        <Modal isOpen={openFriendsRequest}><FriendsRequest/></Modal>
        {/* </div> */}
      </div>
    </>
  );
}
