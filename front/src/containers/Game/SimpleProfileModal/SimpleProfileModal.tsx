"use client";
import { serverAxios } from "@/services/api";
import { userAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import styles from "../game.module.scss";


export default function SimpleProfileModal() {
    const [user, setUser] = useAtom(userAtom);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await serverAxios("/user/my-info");
          console.log(response);
          setUser(response.data);
        } catch (err) {
          console.log("유저 정보 에러", err);
        }
      };
  
      /** userAtom이 비었으면, data로 업데이트 */
      // if (Object.keys(user).length === 0) {
        fetchData();
      // }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const userdetail = (user: object) => {
        return Object.entries(user).map(([key, value]) => (
          <div key={key}>
            {key} : {value}
          </div>
        ));}


    return(<div className={styles.modalContainer}>
        {userdetail(user)}
      </div>)
}
