"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Frame } from "stompjs";
import type { Quiz } from "@/types";
import { useWebSocket } from "./WebSocketProvider";

export default function SubscriptionQuiz() {
  const stompClient = useWebSocket();
  const params = useParams();
  const roomId = Number(params.id);
  // eslint-disable-next-line no-null/no-null
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  console.log(quiz);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (stompClient) {
      const subscription = stompClient.subscribe(
        `/sub/game/quiz/${roomId}`,
        function handleRoomInfo(frame: Frame) {
          const roomInfo = JSON.parse(frame.body);
          // eslint-disable-next-line no-empty
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stompClient]);
}
