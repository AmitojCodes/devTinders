import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(BASE_URL + `/chat/${targetUserId}`, {
        withCredentials: true,
      });
      console.log(res.data.messages);
      setMessages(res.data.messages);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on(
      "messageReceived",
      ({ text, userId, sender, time, status, targetUserId, photo }) => {
        console.log(
          "text, userId, sender, time, status, targetUserId",
          text,
          userId,
          sender,
          time,
          status,
          targetUserId
        );
        setMessages((prev) => [
          ...prev,
          {
            text,
            userId,
            time,
            status,
            _id: userId,
            senderId: {
              _id: userId,
              firstName: sender,
              photo: photo,
            },
          },
        ]);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      text: newMessage,
      userId,
      sender: firstName,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "Delivered",
      targetUserId,
      photo: user?.photo,
    });
    setNewMessage("");
  };

  return (
    <>
      <div className="mt-2 justify-center flex text-xl font-semibold italic">
        Chat
      </div>
      <div className="overflow-y-scroll h-[60vh] border border-base-300">
        {messages.map((message, index) => {
          return (
            <div key={index}>
              {message.senderId?._id != userId ? (
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={
                          message.senderId?.photo ||
                          "https://via.placeholder.com/150"
                        }
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {message.senderId?.firstName} {message.senderId?.lastName}
                    <time className="text-xs opacity-50">{message.time}</time>
                  </div>
                  <div className="chat-bubble">{message.text}</div>
                  <div className="chat-footer opacity-50">{message.status}</div>
                </div>
              ) : (
                <div className="chat chat-end">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={
                          message.senderId?.photo ||
                          "https://via.placeholder.com/150"
                        }
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {message.senderId?.firstName} {message.senderId?.lastName}
                    <time className="text-xs opacity-50">{message.time}</time>
                  </div>
                  <div className="chat-bubble">{message.text}</div>
                  <div className="chat-footer opacity-50">{message.status}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-1 justify-center gap-x-2 mt-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type ...."
          className="input input-md w-3/4"
        />
        <button type="submit" className="btn btn-success" onClick={sendMessage}>
          Send
        </button>
      </div>
    </>
  );
};

export default Chat;
