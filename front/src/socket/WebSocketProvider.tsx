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
    const socket = new SockJS("https://j9e101.p.ssafy.io/api/socket/ws");
    const accessToken = sessionStorage.getItem("accessToken");
    const headers = {
      authorization: `Bearer ${accessToken}`,
    };

    const client = Stomp.over(socket);
    // client.debug = () => {};
    // client.configure({
    //    reconnectDelay: 5000,
    // });
    function connect() {
      client.connect(headers, function connection() {
        setStompClient(client);
      });
    }

    connect();

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  return <WebSocketContext.Provider value={stompClient}>{children}</WebSocketContext.Provider>;
}
