import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

type ResultProps = {
  gameType?: string | string[];
  wpm: number;
  avgScore: number;
  accuracy: number;
};

const Result: React.FC<ResultProps> = ({
  gameType,
  wpm,
  accuracy,
  avgScore,
}) => {
  const router = useRouter();
  return (
    <>
      <div
        style={{
          background: "rgba(0,0,0,0.5)",
          backgroundSize: "cover",
        }}
        className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-zinc-100 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font-extrabold ">
                {wpm !== avgScore && accuracy >= 90 ? (
                  <span className="text-slate-900 uppercase">
                    you made it on this level
                  </span>
                ) : (
                  <span className="text-red-900 uppercase">
                    lower or less accurate
                  </span>
                )}
              </h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => router.reload()}
              >
                <span className=" opacity-7 h-6 w-6  text-center flex justify-center items-center font-mono text-yellow-100   bg-gray-400 py-0 rounded-full">
                  x
                </span>
              </button>
            </div>
            <div className="flex">
              <div className="w-64 m-6 h-64 rounded-full bg-gray-500 flex justify-center items-center bg-cover">
                <Image
                  width={256}
                  height={200}
                  src={
                    wpm === avgScore && accuracy > 90
                      ? "/turtle.svg"
                      : "/rocket.svg"
                  }
                  alt=""
                />
              </div>
              <div className="flex-col m-14 justify-between">
                <h1 className="text-xl  font-bold">
                  Speed:{" "}
                  <span className=" text-6xl font-serif font-extrabold text-slate-500">
                    {wpm}wpm
                  </span>
                </h1>
                <h1 className="text-xl font-bold">
                  Acurracy percentage:{" "}
                  <span className=" text-6xl font-serif font-extrabold text-slate-500">
                    {accuracy}%
                  </span>
                </h1>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-rose-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => router.reload()}
              >
                retry
              </button>
              <button
                className="text-white bg-slate-900 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => router.push(`/`)}
              >
                Home Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Result;
