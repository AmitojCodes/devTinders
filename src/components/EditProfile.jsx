import React, { useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const { emailId } = user;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [photo, setPhoto] = useState(user.photo);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleSave = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/update",
        {
          firstName,
          lastName,
          age,
          photo,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setShowToast(true);
      dispatch(addUser(res.data.data));
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Saved successfully.</span>
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
        {user && <Card user={{ firstName, lastName, age, photo, emailId }} />}
      </div>
    </>
  );
};

export default EditProfile;
