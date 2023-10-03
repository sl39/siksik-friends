"use client";

import { useEffect, useState } from "react";
import { useWebSocket } from "./WebSocketProvider";
import { useParams } from "next/navigation";
import { Frame } from "stompjs";
import { Quiz } from "@/types";

export default function SubscriptionQuiz() {
  const stompClient = useWebSocket();
  const params = useParams();
  const roomId = Number(params.id);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  useEffect(() => {
    if (stompClient) {
      const subscription = stompClient.subscribe(
        `/sub/game/quiz/${roomId}`,
        function handleRoomInfo(frame: Frame) {
          const roomInfo = JSON.parse(frame.body);
          if (roomInfo === "start") {
          } else {
            setQuiz(roomInfo);
          }
        },
        {}
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient]);
}
