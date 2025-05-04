const { createServer } = require("node:http");
const { Server } = require("socket.io");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = 3000;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*", // adjust this in production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    socket.on("joinRoom", ({ projectId }) => {
      socket.join(projectId);
      console.log(`🟢 User ${socket.id} joined room ${projectId}`);
    });

    socket.on("sendMessage", ({ projectId, message }) => {
      io.to(projectId).emit("receiveMessage", message);
      console.log(`📤 Message sent to room ${projectId}`);
    });

    socket.on("userTyping", ({ projectId, user }) => {
      socket.to(projectId).emit("userTyping", { user });
    });

    socket.on("userStoppedTyping", ({ projectId, user }) => {
      socket.to(projectId).emit("userStoppedTyping", { user });
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });

  httpServer.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
