import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./index.scss";
const socket = io("ws://localhost:3000");
export default function Demo() {
  const [inputValue, setInputValue] = useState<string>("");
  const [messageList, setMessageList] = useState<
    { message: string; id: number }[]
  >([]);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      message: inputValue,
    });
  };

  socket.on("connect", function () {
    socket.emit("sendMessage", {
      message: "用户上线了",
    });
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });

  useEffect(() => {
    let count = 0;
    socket.on("receiveMessage", function (data: { message: string }) {
      count++;
      setMessageList((messageList) => [
        ...messageList,
        { message: data.message, id: count },
      ]);
    });
  }, []);

  return (
    <div className="page-content">
      <div className="message-content">
        {messageList.map((e) => (
          <p className="message-item" key={e.id}>
            {e.message}
          </p>
        ))}
      </div>
      <div className="input-wrap">
        <input
          type="text"
          className="input"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button className="button" onClick={sendMessage}>
          发送
        </button>
      </div>
    </div>
  );
}
