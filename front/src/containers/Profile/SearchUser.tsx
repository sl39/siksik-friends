"use client";

import { BiSearchAlt } from "react-icons/bi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { serverAxios } from "@/services/api";
import { profileAtom } from "@/store/userAtom";
import styles from "./Profile.module.scss";

export default function SearchUser() {
  const [searchUser, setSearchUser] = useState("");
  const [, setNewProfile] = useAtom(profileAtom);
  const [errMsg, setErrMsg] = useState("");

  const router = useRouter();

  /** 닉네임으로 유저 검색 */
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchUser);
    try {
      const response = await serverAxios(`/user/?nickname=${searchUser}`);
      setErrMsg("");
      await setNewProfile(response.data);
      router.replace(`/home/profile/${response.data.user_id}`);
      setSearchUser("");
    } catch (err) {
      setErrMsg("해당 유저가 없습니다.");
      setSearchUser("");
      console.log("닉네임 검색", err);
    }
  };
  return (
    <>
      <div className={styles.errText}>{errMsg}</div>
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <input
          className={styles.searchText}
          placeholder="닉네임으로 검색"
          type="text"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          onBlur={() => setErrMsg("")}
        />
        <button type="submit" className={styles.searchBtn}>
          <BiSearchAlt className={styles.icon} size={28} color="#666" />
        </button>
      </form>
    </>
  );
}
