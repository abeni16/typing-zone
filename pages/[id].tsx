import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import randomWords from "random-words";
import { clearInterval } from "timers";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { games } from "../data";
import Result from "../components/Result";

const Game: React.FC = () => {
  let sec = 60;
  const [noWords, setNowords] = useState(0);
  const [words, setWords] = useState<any[]>([]);
  const [second, setSecond] = useState(sec);
  const [curInput, setcurInput] = useState("");
  const [curWordIdx, setCurIdx] = useState<number>(0);
  const [curCharIdx, setCurCharIndex] = useState<number>(-1);
  const [curChar, setCurChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setInCorrect] = useState(0);

  const router = useRouter();
  const gameType = router.query;
  let index: number;

  console.log(gameType, noWords);
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
    } else if (
      wordIdx === curWordIdx &&
      curCharIdx >= words[curWordIdx]?.length
    ) {
      return "bg-red-500 animate-pulse";
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (second > 0 && (curCharIdx !== -1 || curWordIdx !== 0)) {
      console.log(curInput);

      second > 0 && setTimeout(() => setSecond(second - 1), 1000);

      return;
    } else if (second === 0) {
    } else {
      console.log("inside else", curInput);
      second > 0 && setTimeout(() => setSecond(second), 1000);
      return;
    }
  }, [second, curCharIdx, curWordIdx]);

  useEffect(() => {
    games.map((item) => {
      if (item.name === gameType.id) {
        setNowords(item.avgScore);
      }
    });
  }, [gameType]);
  useEffect(() => {
    const allWords = randomWords(noWords);
    setWords(allWords as any);
  }, [noWords]);
  return (
    <div className="flex   bg-slate-900  justify-between text-center items-center flex-col h-auto ">
      <div
        style={{ background: "url('wave.svg')", backgroundSize: "cover" }}
        className="flex justify-between text-center w-full items-center flex-col h-screen "
      >
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
        <div className="flex ">
          {second === 0 || curWordIdx === noWords ? (
            <Result
              gameType={gameType.id}
              wpm={correct + incorrect}
              avgScore={noWords}
              accuracy={
                correct === 0 && incorrect === 0
                  ? 0
                  : Math.floor((correct / (correct + incorrect)) * 100)
              }
            />
          ) : (
            <div className="w-32 h-32 flex justify-center items-center rounded-full  mx-1 p-2 text-3xl bg-slate-500 text-blue-50">
              <div
                className="font-mono text-6xl font-bold leading-none"
                x-text="seconds"
              >
                {second}
              </div>
            </div>
          )}
        </div>
        <input
          type="text"
          disabled={second === 0 || curWordIdx === noWords}
          onBlur={({ target }) => target.focus()}
          onKeyDown={handleKeyDown}
          value={curInput}
          className=" opacity-0 cursor-default"
          onChange={(event) => setcurInput(event.target.value)}
          ref={ref}
        />

        <div
          onClick={() => ref.current?.focus()}
          className=" bg-slate-500 mb-6  border-cyan-100 shadow-2xl shadow-teal-900 overflow-scroll text-justify p-3  rounded-md max-w-3xl max-w-8xl "
        >
          <p className="">
            {words.map((word: string, index) => (
              <>
                <span
                  className={" font-mono font-thin text-2xl text-white"}
                  key={index}
                >
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
    </div>
  );
};
export default Game;
