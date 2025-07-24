import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  path: "/api/socket_io",
});

export default socket;
