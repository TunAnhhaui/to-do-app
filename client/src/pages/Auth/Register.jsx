import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import AuthServices from "../../services/authService";
import { getErrorMessage } from "../../util/GetError";
import { useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState("false");
  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = {
        firstName,
        lastName,
        username,
        password,
      };
      await AuthServices.registerUser(data);

      setLoading(false);
      setIsError(false);
      navigate("/login");
    } catch (err) {
      setIsError(true);
      setMessage(getErrorMessage(err));
      setLoading(false);
    }
  };
  return (
    <div className="h-">
      <Navbar active={"home"} />
      <div className="mt-[140px] w-full flex items-center justify-center">
        <div className="border-2 px-10 pt-16 pb-10 bg-white border-gray-500 rounded-3xl select-none">
          <h2 className="text-5xl font-semibold">Create Account</h2>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Welcome! Fill in details to get started.
          </p>
          <div className="flex mt-4 gap-4">
            <div className="flex flex-col">
              <label className="text-lg font-medium">Firt name</label>
              <input
                className="w-full border-2 outline-none  border-gray-200 rounded-xl p-4 mt-1 bg-transparent"
                type="text"
                placeholder="Enter First Name..."
                value={firstName}
                onChange={handleChangeFirstName}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium">Last name</label>
              <input
                className="w-full border-2 outline-none  border-gray-200 rounded-xl p-4 mt-1 bg-transparent"
                type="text"
                placeholder="Enter Last Name..."
                value={lastName}
                onChange={handleChangeLastName}
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <label className="text-lg font-medium">Username</label>
              <input
                className="w-full border-2 outline-none border-gray-200 rounded-xl p-4 mt-1 bg-transparent"
                type="text"
                placeholder="Enter Username..."
                value={username}
                onChange={handleChangeUsername}
              />
            </div>
            <div>
              <label className="text-lg font-medium">Password</label>
              <input
                className="w-full border-2 outline-none border-gray-200 rounded-xl p-4 mt-1 bg-transparent"
                type="password"
                placeholder="Enter Password..."
                value={password}
                onChange={handleChangePassword}
              />
            </div>
            <div className="flex flex-col gap-2 justify-center items-center mt-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 w-[50%] py-3 rounded-xl text-white"
              >
                {loading ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  "Register"
                )}
              </button>
              {!isError ? (
                <div className="text-green-600">{message}</div>
              ) : (
                <div className="text-red-500 font-semibold">{message}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
