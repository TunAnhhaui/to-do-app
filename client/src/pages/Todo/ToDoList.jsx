import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import { getUserDetails } from "../../util/GetUser";
import ToDoServices from "../../services/toDoService";
import { useNavigate } from "react-router";
import ToDo from "../../components/ToDo";

const ToDoList = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allToDo, setAllToDo] = useState([]);
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setIsAdding(true);
  };

  const handleCloseModel = () => {
    setIsAdding(false);
  };

  const handleSubmitTask = async (title, description) => {
    try {
      setIsLoading(true);
      const userId = getUserDetails()?.userId;
      const data = {
        title,
        description,
        isCompleted: false,
        createdBy: userId,
      };
      const response = await ToDoServices.createToDo(data);
      setIsLoading(false);
      setIsAdding(false);
      getAllToDo(userId);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllToDo = async (userId) => {
    try {
      const response = await ToDoServices.getAllToDo(userId);
      setAllToDo(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let user = getUserDetails();
    if (user && user?.userId) {
      getAllToDo(user?.userId);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Navbar active={"myTask"} />
      <section className="mt-[100px] pt-4 pb-8 px-20 flex justify-center items-center  border-b">
        <div className="container flex items-center flex-wrap justify-between m-0 select-none">
          <h2 className="text-2xl font-semibold">Your Tasks</h2>
          <div className="w-full max-w-sm min-w-[200px]">
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow outline-none "
              placeholder="Search your task here..."
            />
          </div>
          <div>
            <button
              className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              type="button"
              onClick={handleOpenModal}
            >
              Add Task
            </button>
          </div>
        </div>
        {isAdding && (
          <Modal
            closeModel={handleCloseModel}
            submit={handleSubmitTask}
            loading={isLoading}
          />
        )}
      </section>
      <section className="container flex flex-wrap gap-16 mt-12 ">
        {allToDo.map((todo) => (
          <ToDo
            key={todo._id}
            todo={todo}
            loading={isLoading}
            getAllToDo={getAllToDo}
          />
        ))}
      </section>
    </>
  );
};

export default ToDoList;
