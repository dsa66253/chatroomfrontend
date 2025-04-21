import React from 'react';

export function Events({ events }) {
  return (
    <ul>
    {
    events.map((message, index) =>{
        return(<li key={ index }>{message.sender}:{ message.context }</li>)
    })
    }
    </ul>
  );
}