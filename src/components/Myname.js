import React from 'react';
import { socket } from '../socket';

export const Myname = ({ name, setName, canChange })=>  {
    const handleOnChange = (e) => {
        setName(e.target.value);
    };
  return (<div>
      <p style={{display:"inline"}}>name:</p>
    <input value={name} onChange={handleOnChange} disabled={canChange}></input>
    {/* <button onClick={()=>socket.emit('setName', {previous})}>Set</button> */}
  </div>

);
}