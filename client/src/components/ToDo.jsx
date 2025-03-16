import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalUpdate from "./ModalUpdate";
import ToDoServices from "../services/toDoService";
const ToDo = ({ todo, getAllToDo }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCloseModalEditing = () => {
    setIsEditting(false);
  };

  const getFormattedDate = (value) => {
    let date = new Date(value);
    let dateString = date.toDateString();
    let hh = date.getHours();
    let min = date.getMinutes();
    let ss = date.getSeconds();
    let finalDate = `${dateString} ${hh}:${min}:${ss}`;
    return finalDate;
  };

  const handleEdit = (todo) => {
    setIsEditting(true);
    setTitle(todo?.title);
    setDescription(todo?.description);
  };

  const handleSubmitEdit = async (id, data) => {
    try {
      setLoading(true);
      const response = await ToDoServices.updatelToDo(id, data);
      console.log(response);
      setLoading(false);
      setIsEditting(false);
      getAllToDo(todo.createdBy);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (todo) => {
    try {
      const response = await ToDoServices.deleteToDo(todo._id);
      getAllToDo(todo.createdBy);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateStatus = async (todo) => {
    try {
      const id = todo._id;
      const data = {
        title: todo.title,
        description: todo.description,
        isCompleted: true,
      };
      const response = await ToDoServices.updatelToDo(id, data);

      getAllToDo(todo.createdBy);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-calc-width border p-4 rounded-lg shadow-lg select-none">
      <div className="border-b-[1px] pb-4">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold text-xl">{todo?.title}</h3>
          {JSON.parse(todo?.isCompleted) ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium  px-2.5 py-0.5 rounded-md  border border-green-400">
              Completed
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 text-xs font-medium  px-2.5 py-0.5 rounded-md  border border-red-400">
              Incomplete
            </span>
          )}
        </div>
        <p>{todo?.description}</p>
      </div>
      <div className="flex justify-between mt-4">
        <span className=" text-xs bg-gray-100 text-gray-800  font-medium inline-flex items-center px-2.5 py-0.5 rounded-sm me-2 border-gray-500 ">
          <svg
            className="w-2.5 h-2.5 me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
          </svg>
          {getFormattedDate(todo?.createdAt)}
        </span>
        <div className="flex justify-center gap-2 items-center">
          <FontAwesomeIcon
            title="Edit"
            icon={faPenToSquare}
            className="text-blue-500 text-md"
            onClick={() => {
              if (todo.isCompleted !== true) {
                handleEdit(todo);
              }
            }}
          />
          <FontAwesomeIcon
            title="Delete"
            icon={faTrash}
            className="text-red-600 text-md"
            onClick={() => handleDelete(todo)}
          />
          {todo?.isCompleted === true ? (
            <FontAwesomeIcon
              title="Compeled"
              icon={faCircleCheck}
              className="text-green-600 text-md"
            />
          ) : (
            <FontAwesomeIcon
              title="Incompele"
              icon={faCircleCheck}
              className="text-red-500 text-md"
              onClick={() => handleUpdateStatus(todo)}
            />
          )}
        </div>
      </div>
      {isEditting && (
        <ModalUpdate
          todo={todo}
          closeModel={handleCloseModalEditing}
          title={title}
          description={description}
          submit={handleSubmitEdit}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ToDo;
