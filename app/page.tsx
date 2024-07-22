"use client";
import { useChat } from "ai/react";
import {
  Bot,
  Loader,
  Loader2,
  MoreHorizontal,
  Plus,
  Send,
  User2,
  X,
} from "lucide-react";
import Image from "next/image";
import Markdown from "./ChatIA/markdown";
import { ChangeEvent, useState } from "react";
import SelectedImages from "./ChatIA/selectedImages";
import Messages from "./ChatIA/messages";
import InputForm from "./ChatIA/inputForm";

import Header from "./components/Menu";
import { UserButton } from "@clerk/nextjs";
import DefaultSidebar from "./components/sidebar";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/genai",
    });

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 flex flex-col items-center p-12 text-lg relative">
        <InputForm
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
        />
        <Messages messages={messages} isLoading={isLoading} />
      </main>
     <DefaultSidebar/>
     
    </div>
  );
}
