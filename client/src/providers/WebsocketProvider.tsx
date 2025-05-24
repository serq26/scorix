import { createContext, useEffect, useRef, useState } from "react";
import { MatchType } from "../types/matchType";

type WebsocketContextType = {
  matchList: MatchType[];
  category: string | null;
  handleChangeCategory: (event: React.MouseEvent<HTMLElement>, category: string | null) => void;
};

const WebsocketContext = createContext<WebsocketContextType | null>(null);

function WebsocketProvider({ children }: { children: React.ReactNode }) {
  const [matchList, setMatchList] = useState<MatchType[]>([]);
  const [category, setCategory] = useState<string | null>("live");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8080");

    socketRef.current.onopen = () => {
      socketRef.current?.send(JSON.stringify({ type: "getCategoryData", category: "live" }));
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "categoryData") {
        setMatchList(message.result);
      }
    };
    return () => {
      socketRef.current?.close();
    };
  }, []);

  const handleChangeCategory = (event: React.MouseEvent<HTMLElement>, newCategory: string | null) => {
    setCategory(newCategory);
    socketRef.current?.send(JSON.stringify({ type: "getCategoryData", category: newCategory }));
  };

  return (
    <WebsocketContext.Provider value={{ matchList, category, handleChangeCategory }}>
      {children}
    </WebsocketContext.Provider>
  );
}

export { WebsocketProvider, WebsocketContext };
