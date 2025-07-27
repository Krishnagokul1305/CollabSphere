// pages/api/socketio.js
import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket?.server?.io) {
    console.log("🧠 Initializing Socket.IO server...");

    const io = new Server(res.socket.server, {
      path: "/api/socketio",
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      socket.on("join-room", ({ userId, projectId }) => {
        socket.join(projectId);
        socket.to(projectId).emit("user_joined", { userId });
      });

      socket.on("message", (msg) => {
        io.to(msg.projectId).emit("message", msg);
      });

      socket.on("delete-message", ({ messageId, projectId }) => {
        io.to(projectId).emit("message-deleted", { messageId });
      });

      socket.on("disconnect", () => {
        console.log("❌ Disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
