"use client";

import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import type { Frame } from "stompjs";
import type { CompatClient } from "@stomp/stompjs";
import styles from "./game.module.scss";

export default function Chatting() {
  type Message = {
    sender: string;
    msg: string;
    sendTime: string;
  };

  const [chatLog, setChatLog] = useState<Message[]>([]);

  const [stompClient, setStompClient] = useState<CompatClient | undefined>(undefined);
  const [message, setMessage] = useState({
    sender: "",
    msg: "",
    sendTime: "",
  });

  // 메시지 핸들링 함수
  const handleMessage = (frame: Frame) => {
    const receivedMessage = JSON.parse(frame.body);
    setChatLog((prevChatLog) => [...prevChatLog, receivedMessage]);
  };

  useEffect(() => {
    // 클라이언트 객체 생성
    const socket = new SockJS("http://j9e101.p.ssafy.io:8083/ws");
    const client = Stomp.over(socket);

    // 연결 함수
    function connect() {
      client.connect({}, function connection() {
        // 연결이 성공한 후에 구독을 수행합니다.
        client.subscribe(
          "/sub/room/chat/1",
          function handleMessageFunction(frame) {
            handleMessage(frame);
          },
          {}
        );
      });

      setStompClient(client); // stompClient 상태 업데이트
    }

    // 컴포넌트가 마운트될 때 연결을 설정합니다.
    connect();

    // 컴포넌트가 언마운트될 때 연결을 끊습니다.
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 메시지 전송 함수
  function sendMessage() {
    if (stompClient) {
      const curr = new Date();
      let hour = String(curr.getHours());
      let minutes = String(curr.getMinutes());
      let sec = String(curr.getSeconds());
      if (hour.length == 1) {
        hour = "0" + hour;
      }
      if (minutes.length == 1) {
        minutes = "0" + minutes;
      }
      if (sec.length == 1) {
        sec = "0" + sec;
      }
      const time = String(hour) + ":" + String(minutes) + ":" + String(sec);

      message.sendTime = String(time);

      // 펴블리셔
      stompClient.send("/pub/room/chat/1", {}, JSON.stringify(message));

      // 입력 필드 초기화
      setMessage({
        sender: "",
        msg: "",
        sendTime: "",
      });
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
    <>
      <div className={styles.chatLog}>
        {chatLog.map((messages, idx) => (
          <div key={messages.sendTime + String(idx)}>
            <strong>{messages.sender}: </strong>
            {messages.msg}
          </div>
        ))}
      </div>
      <div className={styles.chatInput}>
        <input
          type="text"
          id="sender"
          key="sender"
          value={message.sender}
          onChange={(e) => handleInputChange(e)}
          placeholder="보낸이"
        />
        <input
          type="text"
          key="msg"
          id="msg"
          value={message.msg}
          onChange={(e) => handleInputChange(e)}
          placeholder="메시지"
        />
        <button type="submit" onClick={sendMessage}>
          ㄱ
        </button>
      </div>
    </>
  );
}
