import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import  getAIReply  from "./llm/gemini";
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.emit("newMessage", {
    from: "Server",
    text: "Welcome to the chat!",
    createdAt: new Date().getTime(),
  });

  socket.on("createMessage", async (message) => {
    console.log("New message:", message);

    const aiReply =await getAIReply(message.text);

    io.emit("newMessage", {
      from: "AI",
      text: aiReply,
      createdAt: new Date().getTime(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});