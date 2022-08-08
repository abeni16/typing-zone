import React from "react";
import Cards from "./Cards";
import { games } from "../data";
type HomePageProps = {};

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div
      style={{ background: "url('wave.svg')", backgroundSize: "cover" }}
      className="flex justify-between text-center items-center flex-col h-screen  p-2"
    >
      <h1 className=" text-4xl uppercase items-center  text-rose-100 ">
        <span className=" bg-gradient-to-l from-slate-100 to-slate-200 font-bold text-slate-900 pl-3 pr-3 mr-2 border-2 border-blue-200 rounded-md text-center text-4xl">
          T
        </span>
        yping
        <span className="  bg-gradient-to-l from-slate-100 to-slate-200  font-bold text-slate-900 ml-3 pl-3 pr-3 mr-2 border-2 border-blue-200 rounded-md text-center text-4xl">
          z
        </span>
        one
      </h1>
      <h3 className="text-2xl  items-center  text-blue-100">
        Check your typing skills
      </h3>
      <div className="flex w-full justify-around ">
        {games.map((game) => (
          <Cards
            key={game.id}
            avgScore={game.avgScore}
            id={game.id}
            name={game.name}
          />
        ))}
      </div>
    </div>
  );
};
export default HomePage;
