import React from "react";
import Navbar from "../../components/Navbar";
import { Link, NavLink } from "react-router-dom";
import landing from "../../assets/landing.jpg";

const Landing = () => {
  return (
    <div>
      <Navbar active={"home"} />
      <div className="flex flex-wrap mt-[100px] justify-center p-8">
        <div className="w-[40%] my-auto">
          <h1 className="font-bold text-[4rem] select-none py-4">
            Schedule Your Daily Tasks With{" "}
            <span className="text-blue-600">AnhDoDo!</span>
          </h1>
          <div className="m-8 flex gap-4">
            <Link
              to="/register"
              className="bg-blue-600 px-8 py-3 rounded-xl text-white cursor-pointer select-none"
            >
              Register
            </Link>
            <Link
              to="/Login"
              className="bg-gray-300 px-8 py-3 rounded-xl text-violet-600 cursor-pointer select-none"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="w-[50%] ml-8 select-none">
          <img className="w-full bg-cover" src={landing} alt="landing" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
