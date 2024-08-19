import io from "socket.io-client";
const socket = io("http://localhost:3000");
socket.on("connect", function () {
  console.log("连接成功");
  socket.emit("sendMessage", {
    message: "Hello world",
  });
});
socket.on("myEvent", function (data) {
  console.log(data);
});
socket.on("disconnect", function () {
  console.log("断开连接");
});
export default function Demo() {
  return <></>;
}
