"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import type { Frame } from "stompjs";
import { useWebSocket } from "@/socket/WebSocketProvider";
import { userAtom } from "@/store/userAtom";
import styles from "../Game/game.module.scss";

interface Props {
  roomId: number;
}

export default function Chatting({ roomId }: Props) {
  const [user] = useAtom(userAtom);

  type Message = {
    sender: string;
    msg: string;
    sendTime: string;
  };

  const [chatLog, setChatLog] = useState<Message[]>([]);
  const stompClient = useWebSocket();
  const [message, setMessage] = useState({
    sender: user.nickname,
    msg: "",
    sendTime: "",
  });

  // 메시지 핸들링 함수
  // const handleMessage = (frame: Frame) => {
  //   const receivedMessage = JSON.parse(frame.body);
  //   setChatLog((prevChatLog) => [...prevChatLog, receivedMessage]);
  // };

  useEffect(() => {
    if (stompClient) {
      // stompClient를 사용하여 채팅 메시지를 구독합니다.
      const subscription = stompClient.subscribe(
        `/sub/room/chat/${roomId}`,
        function handleMessageFunction(frame: Frame) {
          const receivedMessage = JSON.parse(frame.body);
          setChatLog((prevChatLog) => [...prevChatLog, receivedMessage]);
        },
        {}
      );

      return () => {
        // 컴포넌트가 언마운트될 때 구독을 언서브스크라이브합니다.
        subscription.unsubscribe();
      };
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stompClient]);

  // 메시지 전송 함수
  function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message.msg !== "") {
      if (stompClient) {
        // const curr = new Date();
        // let hour = String(curr.getHours());
        // let minutes = String(curr.getMinutes());
        // let sec = String(curr.getSeconds());
        // if (hour.length === 1) {
        //   hour = `0${hour}`;
        // }
        // if (minutes.length === 1) {
        //   minutes = `0${minutes}`;
        // }
        // if (sec.length === 1) {
        //   sec = `0${sec}`;
        // }
        // const time = `${hour}:${minutes}:${sec}`;

        // message.sendTime = String(time);

        // 펴블리셔
        stompClient.send(`/pub/room/chat/${roomId}`, {}, JSON.stringify(message));

        // 입력 필드 초기화
        setMessage({
          sender: user.nickname,
          msg: "",
          sendTime: "",
        });
      }
    }
  }

  // 받은 메시지 관리

  // Message 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setMessage((prevMessage) => ({
      ...prevMessage,
      [id]: value,
    }));
  };

  return (
    <div className={styles.roomChat}>
      <div className={styles.chatLog}>
        {chatLog.map((messages, idx) => (
          <div className={styles.chat} key={messages.sendTime + String(idx)}>
            <p className={styles.senderLog}>{messages.sender}: </p>
            <p className={styles.msgLog}>{messages.msg}</p>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className={styles.chatInput}>
        <input
          type="text"
          id="sender"
          key="sender"
          value={message.sender}
          // onChange={(e) => handleInputChange(e)}
          placeholder="보낸이"
          className={styles.sender}
          autoComplete="off"
          readOnly
        />
        <input
          type="text"
          id="msg"
          key="msg"
          value={message.msg}
          onChange={(e) => handleInputChange(e)}
          placeholder="메시지"
          className={styles.input}
          autoComplete="off"
        />
        <button type="submit" className={styles.submitBtn}>
          전송
        </button>
      </form>
    </div>
  );
}
