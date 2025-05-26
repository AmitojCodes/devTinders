import React from "react";

const ConnectionsCard = ({ conn, action = false, handleRequest }) => {
  const { firstName, lastName, emailId, age, gender, photo } = conn;

  return (
    <div className="card card-side shadow-sm bg-base-300 mt-4 w-1/2">
      <figure>
        <img src={photo} alt="Photo" className="w-20 h-20 rounded-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{emailId}</p>
        <p>
          {age} {gender}
        </p>
        {action && (
          <div className="card-actions justify-end">
            <button
              onClick={() => {
                handleRequest("rejected");
              }}
              className="btn btn-primary"
            >
              Reject
            </button>
            <button
              onClick={() => {
                handleRequest("accepted");
              }}
              className="btn btn-secondary"
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionsCard;
