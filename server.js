// server.js
const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(server, {
    path: "/api/socket_io",
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join-room", ({ userId, projectId }) => {
      socket.join(projectId);
      socket.to(projectId).emit("user_joined", { userId });
    });

    socket.on("message", (msg) => {
      io.to(msg.projectId).emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`> Server listening at http://localhost:${PORT}`);
  });
});
