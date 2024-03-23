"use client";

import useGenerateAnswer from "@/hooks/GenerateAnswer";

export default function Chatbot() {
    
  const { handleClick, isStreaming, answer, prompt, setPrompt } = useGenerateAnswer();

  return (
    <div className="flex flex-col min-h-screen min-w-full justify-center items-center">
      <div className="w-[80vw] ">{answer}</div>
      <div className="flex">
        <input
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          placeholder="Enter your prompt"
        />

        <button
          onClick={handleClick}
          disabled={prompt === "" || isStreaming}
          className="border-2 disabled:opacity-20  border-orange-500 h-12 w-14 hover:bg-orange-500 active:scale-95  duration-200 "
        >
          chat
        </button>
      </div>
    </div>
  );
}
