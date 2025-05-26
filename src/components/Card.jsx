import React from "react";

const Card = ({ user, requestProfile, actions = true }) => {
  const { firstName, lastName, photo, age, gender, emailId } = user;
  return (
    <div className="card bg-base-300 w-96 my-5 place-self-center shadow-sm">
      <figure>
        <img src={photo} alt="photo" />
      </figure>
      <div className="card-body justify-center">
        <h2 className="card-title"></h2>
        <p>
          {firstName} {lastName}
        </p>
        <p>
          {age} {gender}
        </p>
        <p>{emailId}</p>
        {actions && (
          <div className="card-actions justify-center flex">
            <button
              onClick={() => {
                requestProfile("ignored");
              }}
              className="btn btn-primary"
            >
              Ignore
            </button>
            <button
              onClick={() => {
                requestProfile("interested");
              }}
              className="btn btn-secondary"
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
