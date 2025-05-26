import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestsSlice";
import ConnectionsCard from "./ConnectionsCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [showToast, setShowToast] = useState(false);
  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/requests", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleRequest = async (id, request) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/request/review/${request}/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      // fetchRequests();
      dispatch(removeRequests(id));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <>No requests found </>;

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Request sent successfully.</span>
          </div>
        </div>
      )}
      <div className="justify-center flex text-3xl font-semibold mt-6">
        Requests
      </div>
      <div className="justify-items-center">
        {requests &&
          requests.map((conn) => {
            return (
              <ConnectionsCard
                conn={conn.fromUserId}
                action={true}
                handleRequest={(request) => handleRequest(conn._id, request)}
              />
            );
          })}
      </div>
    </>
  );
};

export default Requests;
