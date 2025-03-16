import { Route, Routes, Navigate } from "react-router";
import "./index.css";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ToDoList from "./pages/Todo/ToDoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const isLogin = localStorage.getItem("toDoAppUser");

function App() {
  const isLoggedIn = isLogin && isLogin !== "null" && isLogin !== "";
  return (
    <Routes>
      <Route path="/" element={!isLoggedIn ? <Landing /> : <ToDoList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/to-do-list" element={<ToDoList />} />
    </Routes>
    // <ToDo />
  );
}

export default App;
