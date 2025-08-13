import React from "react";
import { formatDistanceToNow } from "date-fns";

function ChatList({ chats, onSelectChat }) {
  if (!chats.length) return <div>No chats available</div>;

  const getInitials = (str) => {
    if (!str) return "?";
    return str
      .split(" ")
      .map(w => w[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="chat-list">
      {chats.map(chat => (
        <div
          key={chat.id}
          className="chat-list-item"
          onClick={() => onSelectChat(chat)}
        >
          <div className="avatar">
            <div className="avatar-initials">{getInitials(chat.name || chat.id)}</div>
          </div>
          <div style={{ flex: 1 }}>
            <strong>{chat.name}</strong>
            <p>{chat.text}</p>
          </div>
          <div className="timestamp">
            {chat.timestamp
              ? formatDistanceToNow(new Date(chat.timestamp), { addSuffix: true })
              : ""}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
