import React, { useState, useEffect } from 'react';
import { socket } from '../socket';
import { Events } from './Events';
import { MyForm } from './MyForm';


export const Chatroom = ({ name, roomName}) => {
    const [fooEvents, setFooEvents] = useState([]);
    useEffect(() => {
        function onFooEvent(message) {
        setFooEvents(previous => [...previous, message]);
        }
        socket.on('message', onFooEvent);
        // todo the user in the same room cannot receive the message from other users
        return () => {
            // unmounted component
            socket.off('message', onFooEvent);
        };
    }, []);
    useEffect(() => {
        setFooEvents([]);
      }, [roomName]);

    return (
        <div>
            <h3>Room: {roomName}</h3>
            <MyForm name={name}  roomName={roomName}/>
            <Events events={fooEvents}/>
        </div>
    )
  };