import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import ConnectionsCard from "./ConnectionsCard";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL+"/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      console.log(res.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <>No Connections Found</>;

  return (
    <>
      <div className="justify-center flex text-3xl font-semibold mt-6">
        Connections
      </div>
      <div className="justify-items-center">
        {connections &&
          connections.map((conn) => {
            return <ConnectionsCard conn={conn} />;
          })}
      </div>
    </>
  );
};

export default Connections;
