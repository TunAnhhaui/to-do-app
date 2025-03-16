import React, { useState } from "react";
import { useNavigate } from "react-router";

const Dropdown = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Ví dụ: Xóa user khỏi localStorage và điều hướng đến trang login
    localStorage.removeItem("toDoAppUser");
    navigate("/login");
  };

  const [options] = useState([
    {
      label: "Log out",
      action: handleLogout, // Hàm khi chọn
    },
  ]);

  return (
    <div className="relative">
      <div className="absolute   w-full   bg-white border rounded shadow-lg">
        {options.map((option, index) => (
          <a
            href="#"
            key={index}
            onClick={option.action} // Gọi hàm khi click vào tùy chọn
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            {option.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
