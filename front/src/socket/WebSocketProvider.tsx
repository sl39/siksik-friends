import React, { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import type { CompatClient } from "@stomp/stompjs";
import type { ReactNode } from "react";

// WebSocket 컨텍스트 타입
type WebSocketContextType = CompatClient | null;

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export function useWebSocket(): WebSocketContextType | undefined {
  return useContext(WebSocketContext);
}

type WebSocketProviderProps = {
  children: ReactNode;
};

export default function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [stompClient, setStompClient] = useState<WebSocketContextType | undefined>(undefined);

  useEffect(() => {
    const connect = async () => {
      try {
        const socket = new SockJS("https://j9e101.p.ssafy.io/api/socket/ws");
        const accessToken = sessionStorage.getItem("accessToken");
        console.log(accessToken)
        console.log(location.origin)
        const headers = {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          Authorization: `Bearer ${accessToken}`,
        };

        const client = Stomp.over(socket);

        await new Promise((resolve) => {
          client.connect(headers, resolve);
        });
        setStompClient(client);
      } catch (err) {
        console.log("소켓 에러", err);
      }
    };

    connect();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <WebSocketContext.Provider value={stompClient}>{children}</WebSocketContext.Provider>;
}
