import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getUserDetails } from "../util/GetUser";
import Dropdown from "./Dropdown";

const Navbar = (active) => {
  const [user, setUser] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const userDetails = getUserDetails();
    setUser(userDetails);
  }, []);

  return (
    <header>
      <nav className="flex justify-between py-4 px-8 items-center fixed top-0 left-0 right-0 z-100 w-full bg-white shadow-[0px_0.233px_8px_lightgray]">
        <div className="">
          {/* <img className="w-[100px]" src={logo} alt="logo" /> */}
          <h4 className="font-bold text-3xl select-none text-blue-600">
            AnhToDo
          </h4>
        </div>
        <ul className="flex gap-12 pr-10">
          {!user && (
            <li>
              <Link to="/" className={active === "home" ? "activeNav" : ""}>
                <span className="relative p-2 cursor-pointer select-none after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 hover:after:-scale-x-100 text-[18px]">
                  Home
                </span>
              </Link>
            </li>
          )}

          {user && (
            <li>
              <Link
                to="/to-do-list"
                className={active === "myTask" ? "activeNav" : ""}
              >
                <span className="relative p-2 cursor-pointer select-none after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 hover:after:-scale-x-100 text-[18px]">
                  My Task
                </span>
              </Link>
            </li>
          )}
          {user ? (
            <div className="relative select-none">
              <button
                onClick={toggleDropdown}
                className="bg-blue-500 
                 text-white py-1 px-4 rounded"
              >
                {user?.firstName
                  ? `Hello, ${user?.firstName} ${user?.lastName}`
                  : user?.username}
              </button>

              {isOpen && <Dropdown />}
            </div>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="relative p-2 cursor-pointer select-none after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 hover:after:-scale-x-100 text-[18px]"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="relative p-2 cursor-pointer select-none after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 hover:after:-scale-x-100 text-[18px]"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
