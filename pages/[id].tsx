import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import randomWords from "random-words";
import { clearInterval } from "timers";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
type GameProps = {};

const Game: React.FC<GameProps> = () => {
  let sec = 60;
  let value = 99;
  const [words, setWords] = useState([]);
  const [second, setSecond] = useState(sec);
  const [curInput, setcurInput] = useState("");
  const [curWordIdx, setCurIdx] = useState<number>(0);
  const [curCharIdx, setCurCharIndex] = useState<number>(-1);
  const [curChar, setCurChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setInCorrect] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [started, setStarted] = useState<boolean>(false);
  const index = 90;
  const ref = useRef(null);

  const handleKeyDown = ({ keyCode, key }: any) => {
    if (keyCode === 32) {
      checkMatch();
      setcurInput("");
      setCurIdx(curWordIdx + 1);
      setCurCharIndex(-1);
    } else if (keyCode === 8) {
      setCurCharIndex(curCharIdx - 1);
      setCurChar("");
    } else {
      setCurCharIndex(curCharIdx + 1);
      setCurChar(key);
    }
  };

  const checkMatch = () => {
    const wordToCompare = words[curWordIdx];
    const doesItMatched = wordToCompare === curInput.trim();
    if (doesItMatched) {
      setCorrect(correct + 1);
    } else {
      setInCorrect(incorrect + 1);
    }
    console.log(correct);
  };
  const getCharClass = (wordIdx: number, charIdx: number, char: string) => {
    if (wordIdx === curWordIdx && charIdx === curCharIdx && curChar) {
      if (char === curChar) {
        return "bg-green-500 animate-pulse";
      } else {
        return "bg-red-500 animate-pulse";
      }
    } else if (wordIdx === curWordIdx) {
      return "bg-gray-500 ";
    } else if (
      wordIdx === curWordIdx &&
      curCharIdx >= words[curWordIdx].length
    ) {
      return "bg-red-500 animate-pulse";
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (second > 0 && (curCharIdx !== -1 || curWordIdx !== 0)) {
      console.log(curInput);
      setStarted(true);
      second > 0 && setTimeout(() => setSecond(second - 1), 1000);

      return;
    } else if (second === 0) {
      setSecond(sec);
    } else {
      console.log("inside else", curInput);
      second > 0 && setTimeout(() => setSecond(second), 1000);
      return;
    }
  }, [second, curCharIdx, curWordIdx]);

  useEffect(() => {
    const allWords = new Array(index).fill(null).map(() => randomWords());
    setWords(allWords as any);
  }, []);
  return (
    <div className="flex   bg-slate-900  justify-between text-center items-center flex-col h-auto  p-2">
      <h1 className=" text-4xl uppercase items-center  text-rose-100 my-10">
        <span className=" bg-gradient-to-l from-slate-100 to-slate-200 font-bold text-slate-900 pl-3 pr-3 mr-2 border-2 border-blue-200 rounded-md text-center text-4xl">
          T
        </span>
        yping
        <span className="  bg-gradient-to-l from-slate-100 to-slate-200  font-bold text-slate-900 ml-3 pl-3 pr-3 mr-2 border-2 border-blue-200 rounded-md text-center text-4xl">
          z
        </span>
        one
      </h1>
      <div className="flex">
        <div className="w-24 mx-1 p-2 text-3xl bg-slate-500 text-blue-50 rounded-lg">
          <div className="font-mono font-bold leading-none" x-text="seconds">
            {second}
          </div>
        </div>
        <div className="w-24 mx-1 p-2 text-3xl bg-slate-500 text-blue-50 rounded-lg">
          <div className="font-mono font-bold leading-none" x-text="seconds">
            {correct + incorrect}wpm
          </div>
        </div>
        <div className="w-24 mx-1 p-2 text-3xl bg-slate-500 text-blue-50 rounded-lg">
          <div className="font-mono font-bold leading-none" x-text="seconds">
            {Math.floor((correct / (correct + incorrect)) * 100)}%
          </div>
        </div>
      </div>

      <input
        type="text"
        onBlur={({ target }) => target.focus()}
        onKeyDown={handleKeyDown}
        value={curInput}
        className=" opacity-0 cursor-default"
        onChange={(event) => setcurInput(event.target.value)}
        ref={ref}
      />

      <div
        onClick={() => ref.current.focus()}
        className=" bg-slate-500 overflow-scroll text-justify p-3  rounded-md max-w-3xl max-w-8xl "
      >
        <p className="">
          {words.map((word: string, index) => (
            <>
              <span className={" font-mono text-2xl text-white"} key={index}>
                {word.split("").map((char, id) => (
                  <span className={getCharClass(index, id, char)} key={id}>
                    {char}
                  </span>
                ))}
              </span>
              <span> </span>
            </>
          ))}
        </p>
      </div>
    </div>
  );
};
export default Game;