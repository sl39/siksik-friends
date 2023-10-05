"use client";

// import { useAtom } from "jotai";
import { useEffect } from "react";
// import { friendsAtom, notFriendsAtom, wishFriendsAtom } from "@/store/userAtom";
import { serverAxios } from "@/services/api";
// import UserItem from "../Game/UserItem";

export default function FriendsTab() {
  // const [friends, setFriends] = useAtom(friendsAtom);
  // const [NotFriends, setNotFriends] = useAtom(notFriendsAtom);
  // const [WishFriends, setWishFriends] = useAtom(wishFriendsAtom);

  /** 내 친구 조회 */
  const myFriends = async () => {
    try {
      const response = await serverAxios("/user/friend/list");
      console.log("친구목록", response.data);
      // setFriends(response.data.friendList);
    } catch (err) {
      console.log("친구 목록 에러", err);
    }
  };

  /** 받은 친구 요청 조회 */
  const myRequest = async () => {
    try {
      // response / request
      const response = await serverAxios("/user/friend/response");
      console.log("받은목록", response.data);

      // setNotFriends(response.data.friendList);
    } catch (err) {
      console.log("받은 요청 목록 에러", err);
    }
  };

  /** 요청한 친구 조회 */
  const myResponse = async () => {
    try {
      // response / request
      const response = await serverAxios("/user/friend/request");
      console.log("받은목록", response.data);

      // setWishFriends(response.data.friendList);
    } catch (err) {
      console.log("받은 요청 목록 에러", err);
    }
  };

  useEffect(() => {
    myFriends();
    myRequest();
    myResponse();
  }, []);

  return (
    <div>
      {/* <div>친구들</div>
       {friends}
       <div>내가 요청</div>
       {WishFriends}
       <div>받은 요청</div>
       {NotFriends} */}
    </div>
  );
}
