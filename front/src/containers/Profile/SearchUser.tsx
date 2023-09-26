"use client";

import { BiSearchAlt } from "react-icons/bi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { serverAxios } from "@/services/api";
import styles from "./Profile.module.scss";

export default function SearchUser() {
  const [searchUser, setSearchUser] = useState("");
  const router = useRouter();
  /** 닉네임으로 유저 검색 */
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await serverAxios(`/user/?nickname=${searchUser}`);
      console.log(response.data);
      router.push(`/home/profile/${searchUser}/${response.data.user_id}`);
    } catch (err) {
      console.log("닉네임 검색", err);
    }
  };
  return (
    <form className={styles.searchForm} onSubmit={handleSearch}>
      <input
        className={styles.searchText}
        placeholder="닉네임"
        type="text"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
      />
      <button className={styles.searchBtn} type="submit">
        <BiSearchAlt className={styles.icon} size={28} />
      </button>
    </form>
  );
}
