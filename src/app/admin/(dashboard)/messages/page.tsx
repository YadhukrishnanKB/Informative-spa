"use client";

import { useEffect, useState } from "react";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("/api/contact").then((r) => r.json()).then(setMessages);
  }, []);

  const markRead = async (id: string, read: boolean) => {
    await fetch("/api/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    setMessages((msgs) => msgs.map((m) => m.id === id ? { ...m, read } : m));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Contact Messages</h1>
      <div className="space-y-4">
        {messages.length === 0 && <p className="text-gray-500 text-center py-8">No messages yet.</p>}
        {messages.map((msg) => (
          <div key={msg.id} className={`bg-white rounded-xl p-6 shadow-sm border transition-colors ${!msg.read ? "border-l-4" : ""}`} style={!msg.read ? { borderLeftColor: "var(--primary)" } : {}}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">{msg.name}</h3>
                <p className="text-sm text-gray-500">{msg.email}{msg.phone ? ` | ${msg.phone}` : ""}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString()}</span>
                {!msg.read && (
                  <button onClick={() => markRead(msg.id, true)} className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                    Mark Read
                  </button>
                )}
                {msg.read && (
                  <button onClick={() => markRead(msg.id, false)} className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    Unread
                  </button>
                )}
              </div>
            </div>
            <p className="text-gray-700 whitespace-pre-line">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
