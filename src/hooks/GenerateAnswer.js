import { useState, useRef } from "react";

export default function useGenerateAnswer() {
  var longString =
    "The sun cast its golden rays across the tranquil meadow, illuminating the lush green grass and delicate wildflowers that swayed gently in the soft breeze. Birds chirped melodiously in the nearby trees, adding to the symphony of nature's song. A babbling brook meandered through the landscape, its clear waters reflecting the vibrant colors of the surrounding foliage. It was a scene of pure serenity, a sanctuary where one could escape the chaos of the world and find solace in the embrace of Mother Nature.";

  const [isStreaming, setIsStreaming] = useState(false);

  const [prompt, setPrompt] = useState("");

  const [answer, setAnswer] = useState("");

  let i = useRef(0);
  let intervalId = useRef(null);

  const handleClick = () => {
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
        console.log("cleared");
      }
    }, 20);
  };

  return { handleClick, isStreaming, answer, prompt, setPrompt };
}
