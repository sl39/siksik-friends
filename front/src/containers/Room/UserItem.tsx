"use client";

import { useEffect, useRef, useState } from "react";
import type { soketUser } from "@/types";
import { serverAxios } from "@/services/api";
import styles from "../Game/game.module.scss";

interface Props {
  data: soketUser;
}

export default function UserItem({ data }: Props) {
  console.log(data.ready);
  return (
    <div className={styles.userItem}>
      {/* <Image
        className={styles.profile}
        src={data?.profile || "/images/character/rabbit.png"}
        alt="프로필"
        fill
        sizes="50%"
        priority
        quality={100}
      /> */}
      <div className={styles.userItemBox}>
        {/* <div className={styles.subBox}>{data.level}</div> */}
        <div className={styles.subBox}>{data.userName}</div>
        <div className={styles.subBox}>
          {data.ready ? "ready" : "wait"}
          {data.leader ? " - 방장" : null}
        </div>
      </div>
    </div>
  );
}
