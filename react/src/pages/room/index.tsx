import { useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import "./index.scss";
export default function Room() {
  const [inputValue, setInputValue] = useState<string>("");
  const [messageList, setMessageList] = useState<{ message: string }[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const room = useRef<string>("");

  function joinRoom(roomName: string) {
    socketRef.current = io("ws://localhost:3000");
    socketRef.current.on("connect", function () {
      if (socketRef.current) {
        socketRef.current.emit("joinRoom", { room: roomName });
        room.current = roomName;
        socketRef.current.on("roomMessage", (data) => {
          setMessageList((messageList) => [
            ...messageList,
            { message: data.message },
          ]);
        });
      }
    });
  }

  function disconnect() {
    if (socketRef.current) {
      socketRef.current.emit("leaveRoom", { room: room.current });
    }
  }

  const sendMessage = () => {
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", {
        room: room.current,
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
        <button className="button" onClick={() => joinRoom("roomA")}>
          加入房间A
        </button>
        <button className="button" onClick={() => joinRoom("roomB")}>
          加入房间B
        </button>
        <button className="button" onClick={disconnect}>
          离开房间
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
