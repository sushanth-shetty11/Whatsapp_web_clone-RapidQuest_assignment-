import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getConversations } from "./services/api";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    getConversations().then((res) => setChats(res.data));
  }, []);

  useEffect(() => {
    socket.on("messageReceived", (msg) => {
      const chatId = msg.from === "918329446654" ? msg.to : msg.from;
      setChats((prev) => {
        const index = prev.findIndex((c) => c.id === chatId);
        const updated = {
          id: chatId,
          name: msg.name || chatId,
          text: msg.text,
          timestamp: msg.timestamp
        };
        let list = index > -1 ? prev.map((c) => (c.id === chatId ? updated : c)) : [updated, ...prev];
        return list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      });
    });
    return () => {
      socket.off("messageReceived");
    };
  }, []);

  return (
    <div className="app">
      <div className="chat-list-container">
        <ChatList chats={chats} onSelectChat={setSelectedChat} />
      </div>
      <div className="chat-window-container">
        <ChatWindow selectedChat={selectedChat} />
      </div>
    </div>
  );
}

export default App;
