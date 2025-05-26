import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
  const [showToast, setShowToast] = useState(false);
  const [firstName, setFirstName] = useState("First Name");
  const [lastName, setLastName] = useState("Last Name");
  const [age, setAge] = useState("Age");
  const [emailId, setEmailId] = useState("emailId");
  const [gender, setGender] = useState("Gender");
  const [photo, setPhoto] = useState(
    "https://geographyandyou.com/images/user-profile.png"
  );
  const [password, setPassword] = useState("Password");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        {
          firstName,
          lastName,
          emailId,
          gender,
          age,
          photo,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        dispatch(addUser(res.data.data));
        navigate("/");
      }, 3000);
      console.log(res);
    } catch (err) {
      setError(err.response.data);
      console.log(err.response.data);
    }
  };

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Saved successfully! Logging you in</span>
          </div>
        </div>
      )}
      <div className="flex mx-auto justify-center gap-x-5">
        <div className="h-full">
          <div className="card card-border h-full bg-base-200 mx-auto my-8 justify-center w-96">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">FirstName</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">LastName</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type age"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">EmailId</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type emailId"
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
                  placeholder="Type Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type gender"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">photo</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type photo"
                  value={photo}
                  onChange={(e) => {
                    setPhoto(e.target.value);
                  }}
                />
              </fieldset>
              <div className="text-red-500">{error}</div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        {
          <Card
            user={{ firstName, lastName, age, photo, emailId, gender }}
            actions={false}
          />
        }
      </div>
    </>
  );
};

export default SignUp;
