import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import { Myname } from "./components/Myname";
import { Chatroom } from "./components/Chatroom";
import { OnlineUser } from "./components/OnlineUser";
import { RoomList } from "./components/RoomList";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default function App() {
  const id = getRandomInt(1000);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [name, setName] = useState("noName" + id);
  const [activeRoomName, setActiveRoomName] = useState("roomA");
  const [roomList, setRoomList] = useState(["roomA", "roomB"]);
  console.log("App render");
  const addUser = (aaa) => {
    const user = { id:id, name:name };
    socket.emit("online_user_list", "add", user);
  };

  useEffect(() => {
    function onConnect() {
      addUser();
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [name]);
  // todo that is not good while name is changing
  // the socket will re-register event every time


  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      <Myname name={name} setName={setName} canChange={isConnected} />
      {isConnected ? (
        <>
          <OnlineUser />
          <RoomList
            rooms={roomList}
            setActiveRoomName={setActiveRoomName}
            activeRoomName={activeRoomName}
          />
          <Chatroom name={name} roomName={activeRoomName} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
