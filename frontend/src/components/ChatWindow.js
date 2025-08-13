import React, { useState, useEffect } from "react";
import { getMessages } from "../services/api";
import ChatInput from "./ChatInput";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function ChatWindow({ selectedChat }) {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!selectedChat) return;
    getMessages(selectedChat.id).then((res) => setMessages(res.data));
  }, [selectedChat]);

  useEffect(() => {
    if (!selectedChat) return;
    const handleNewMessage = (msg) => {
      if (msg.from === selectedChat.id || msg.to === selectedChat.id) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    const handleStatus = ({ id, status }) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status } : m))
      );
    };
    const handleTyping = ({ to }) => {
      if (to === "918329446654") {
        setTyping(true);
        setTimeout(() => setTyping(false), 2000);
      }
    };
    socket.on("messageReceived", handleNewMessage);
    socket.on("statusUpdate", handleStatus);
    socket.on("typing", handleTyping);
    return () => {
      socket.off("messageReceived", handleNewMessage);
      socket.off("statusUpdate", handleStatus);
      socket.off("typing", handleTyping);
    };
  }, [selectedChat]);

  if (!selectedChat) return <div className="no-chat">Select a chat to start</div>;

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg._id || msg.id}
            className={`chat-bubble ${msg.from === "918329446654" ? "own" : ""}`}
            style={{ position: "relative", paddingBottom: "18px" }}
          >
            {msg.text}
            <span className="status">
              {msg.status === "read"
                ? "✔✔"
                : msg.status === "delivered"
                ? "✔✔"
                : "✔"}
            </span>
          </div>
        ))}
        {typing && <div className="typing-indicator">Typing...</div>}
      </div>
      <ChatInput selectedChat={selectedChat} socket={socket} />
    </div>
  );
}

export default ChatWindow;
