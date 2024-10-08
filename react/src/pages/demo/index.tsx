import { useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import "./index.scss";
export default function Demo() {
  const [inputValue, setInputValue] = useState<string>("");
  const [messageList, setMessageList] = useState<{ message: string }[]>([]);
  const socketRef = useRef<Socket | null>(null);

  function connect() {
    socketRef.current = io("ws://localhost:3000");
    socketRef.current.on("connect", function () {
      socketRef.current!.on(
        "chatMessage",
        function (data: { message: string }) {
          setMessageList((messageList) => [
            ...messageList,
            { message: data.message },
          ]);
        }
      );
    });
  }

  function disconnect() {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  }

  const sendMessage = () => {
    if (socketRef.current) {
      socketRef.current.emit("userMessage", {
        id: socketRef.current.id,
        message: inputValue,
      });
      setInputValue("");
    }
  };

  return (
    <div className="page-content">
      <div className="message-content">
        {messageList.map((e) => (
          <p className="message-item" key={e.message}>
            {e.message}
          </p>
        ))}
        <button className="button" onClick={connect}>
          上线
        </button>
        <button className="button" onClick={disconnect}>
          下线
        </button>
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
