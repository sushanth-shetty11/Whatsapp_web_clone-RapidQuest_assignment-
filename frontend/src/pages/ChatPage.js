import { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import { getConversations, getMessages, sendMessage } from "../services/api";
import "./ChatPage.css";

function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // Load conversations from backend
  useEffect(() => {
    getConversations().then((res) => {
      setConversations(res.data);
    });
  }, []);

  // When a conversation is clicked
  const openChat = (wa_id) => {
    setSelectedChat(wa_id);
    getMessages(wa_id).then((res) => setMessages(res.data));
  };

  // When sending a new message
  const handleSendMessage = (text) => {
    const msgData = {
      from: "918329446654", // your business number
      to: selectedChat,
      text,
    };

    sendMessage(msgData).then((res) => {
      setMessages((prev) => [...prev, res.data]);
    });
  };

  return (
    <div className="chat-page">
      <ChatList conversations={conversations} onSelectChat={openChat} />
      <ChatWindow
        messages={messages}
        selectedChat={selectedChat}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default ChatPage;
