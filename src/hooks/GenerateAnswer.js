import { useState, useRef } from "react";

import examples from "@/app/chatbot/examples";

export default function useGenerateAnswer() {
  var longString =
    examples[Math.floor(Math.random() * examples.length)] || examples[0];

  const [isStreaming, setIsStreaming] = useState(false);

  const [chats, setChats] = useState([]);

  const [prompt, setPrompt] = useState("");

  const [answer, setAnswer] = useState("");

  let i = useRef(-10);
  let intervalId = useRef(null);

  const handleClick = () => {

    //setting the value of i to -10, to start from the beginning of the string
    i.current = -10;


    setIsStreaming(true);
    //Splitting the long string into individual characters
    let reply = longString.split("");

    //Setting interval to stream the answer
    intervalId.current = setInterval(() => {
      //setting the messages to the first 10 characters
      setAnswer((prev) => {
        const nextChunk = reply.slice(i.current, i.current + 10).join("");

        return prev + nextChunk;
      });

      //incrementing the value of i, to get the next 10 characters
      i.current = i.current + 10;

      if (i.current > reply.length) {
        clearInterval(intervalId.current);
        setIsStreaming(false);
        setChats((prev) => [...prev, { prompt, answer: longString }]);
        setPrompt("");
        setAnswer("");
      }
    }, 20);
  };

  return {
    handleClick,
    isStreaming,
    answer,
    prompt,
    setPrompt,
    setAnswer,
    chats,
  };
}
