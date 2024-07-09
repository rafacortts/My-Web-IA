import React, { useEffect, useRef } from "react";
import Markdown from "./markdown";
import { Bot, User2 } from "lucide-react";
import { Message } from "ai/react";

type Props = {
  messages: Message[],
  isLoading: boolean
};

const Messages = ({ messages, isLoading }: Props) => {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      id="chatbox"
      ref={chatBoxRef}
      className="flex flex-col w-full text-left mt-4 gap-4 whitespace-pre-wrap max-h-[80vh] overflow-y-auto"
    >
      {messages.map((m, index) => (
        <div
          key={index}
          className={`p-4 shadow-md rounded-md ml-10 relative text-black ${
            m.role === "user" ? "bg-gray-300" : ""
          }`}
        >
          <Markdown text={m.content} />
          {m.role === "user" ? (
            <User2 className="absolute -left-10 top-2 border rounded-full p-1 shadow-lg" />
          ) : (
            <Bot
              className={`absolute top-2 -left-10 border rounded-full p-1 shadow-lg text-black ${
                isLoading && index === messages.length - 1
                  ? "animate-bounce"
                  : ""
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Messages;
