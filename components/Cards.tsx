import Image from "next/image";
import Router, { useRouter } from "next/router";
import React from "react";

type CardsProps = {
  id: number;
  name: string;
  avgScore: number;
};

const Cards: React.FC<CardsProps> = ({ id, name, avgScore }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/${name}`);
  };
  return (
    <div className=" w-72  shadow-2xl shadow-yellow-200/50 hover:scale-105 duration-200  rounded overflow-hidden  bg-slate-50 ">
      <div className=" object-cover bg-cover">
        <div
          className=" h-48 duration-300 ease-out "
          style={{ background: `url('patternpad${id}.svg') ` }}
        />
      </div>

      <div className="px-6 py-4 ">
        <div className="font-bold text-2xl uppercase mb-2">
          {name} Challenge
        </div>
        <p className="text-slate-700  text-base">
          Average score:{" "}
          <span className=" text-green-700 text-xl font-bold">
            {avgScore}Wpm
          </span>
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          type="button"
          onClick={handleClick}
          className="text-white active:scale-50 uppercase text-sm bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80 font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2"
        >
          start
        </button>
      </div>
    </div>
  );
};
export default Cards;
