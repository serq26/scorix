import { useContext } from "react";
import { WebsocketContext } from "../providers/WebsocketProvider";

function useWebsocket() {
  const context = useContext(WebsocketContext);
  if (!context) {
    throw new Error("Web Socket Context error!");
  }
  return context;
}

export default useWebsocket;
