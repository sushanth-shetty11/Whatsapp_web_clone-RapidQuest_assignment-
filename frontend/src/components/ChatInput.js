import React, { useState } from "react";
import { sendMessage } from "../services/api";

function ChatInput({ selectedChat, socket }) {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;
    const msg = { from: "918329446654", to: selectedChat.id, text };
    try {
      await sendMessage(msg);
      setText("");
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  const handleTyping = () => socket.emit("typing", { to: selectedChat.id });
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input">
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          handleTyping();
        }}
        onKeyDown={handleKeyDown}
        placeholder="Type a message"
        rows={1}
        style={{ resize: "none", overflow: "auto" }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatInput;
