import { createServer } from "node:http";
import { Server } from "socket.io";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const port = 3000;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("sendMessage", (message) => {
      io.emit("receiveMessage", message); // ✅ Broadcast to all clients
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });

  httpServer.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
