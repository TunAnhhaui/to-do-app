import React, { useEffect, useState } from "react";

const ModalUpdate = ({
  todo,
  closeModel,
  title: initialTitle,
  description: initialDescription,
  loading,
  submit,
}) => {
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");

  const options = [
    { value: false, label: "Not complete" },
    { value: true, label: "Complete" },
  ];

  const handleUpdateTask = async () => {
    try {
      const data = {
        title: updateTitle,
        description: updateDescription,
        isCompleted: updateStatus,
      };
      submit(todo._id, data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setUpdateTitle(initialTitle);
    setUpdateDescription(initialDescription);
  }, [initialTitle, initialDescription]);

  return (
    <div className="">
      <div className="modal fixed left-0 right-0 top-16 z-40 bg-white  border rounded-xl p-4 flex flex-col gap-4 select-none">
        <h3 className="text-lg font-semibold text-gray-900 flex justify-center  ">
          Update To Do Task
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-600 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeModel}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </h3>
        <input
          type="text"
          id="small-input"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Update title...."
          value={updateTitle}
          onChange={(e) => {
            setUpdateTitle(e.target.value);
          }}
        />
        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Update description..."
          value={updateDescription}
          onChange={(e) => {
            setUpdateDescription(e.target.value);
          }}
        ></textarea>
        <select
          onChange={(e) => {
            setUpdateStatus(e.target.value);
          }}
        >
          <option disabled>Choose status</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="flex justify-end">
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            onClick={closeModel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            onClick={handleUpdateTask}
          >
            {loading ? (
              <div className="flex items-center justify-center w-full h-full overflow-hidden">
                <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            ) : (
              "OK"
            )}
          </button>
        </div>
      </div>
      <div className="fixed inset-0 bg-grayDark" />
    </div>
  );
};

export default ModalUpdate;
