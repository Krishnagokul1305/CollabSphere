import { io } from "socket.io-client";

const socket = io({
  path: "/api/socketio",
  transports: ["polling", "websocket"],
  autoConnect: false,
});

export default socket;
