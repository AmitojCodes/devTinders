import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../utils/feedSlice";
import Card from "./Card";
import { BASE_URL } from "../utils/constants";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [showToast, setShowToast] = useState(false);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL+"/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const requestProfile = async (id, request) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/profile/${request}/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setShowToast(true);
      // fetchFeed();
      dispatch(removeFeed(id));
      dispatch(removeFeed(id));
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed) return;

  if (feed.length === 0) return <>Nothing in feed</>;

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Request sent successfully.</span>
          </div>
        </div>
      )}
      <Card
        user={feed[0]}
        requestProfile={(request) => requestProfile(feed[0]._id, request)}
      />
    </>
  );
};

export default Feed;
