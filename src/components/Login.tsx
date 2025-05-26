import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [emailId, setEmailId] = useState("harpreetkaur@gmail.com");
  const [pass, setPass] = useState("Harpreet1!!!!");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password: pass,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  return (
    <div className="h-full">
      <div className="card card-border h-full bg-base-200 mx-auto my-8 justify-center w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">EmailId</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              placeholder="Type here"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
          </fieldset>
          <div className="text-red-500">{error}</div>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/signUp")}
            >
              Sign Up
            </button>
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
