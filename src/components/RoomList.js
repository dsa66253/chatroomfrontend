import { socket } from '../socket';
import { useEffect } from 'react';

export const RoomList = ({ rooms, setActiveRoomName, activeRoomName }) => {
  const enterRoom = (roomName)=>{
    if (activeRoomName !== roomName) {
      socket.emit("join_room", roomName);
      setActiveRoomName(roomName);
    }
  }
  useEffect(() => {
    socket.emit("join_room", activeRoomName);
  }
  , []);
  return (
    <div>
      <h3>Available Rooms</h3>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>
            {
              room===activeRoomName ?
              <button style={{color:"green"}} onClick={() => enterRoom(room)}>{room}</button> :
              <button onClick={() => enterRoom(room)}>{room}</button>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}