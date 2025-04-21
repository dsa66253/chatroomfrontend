import React, { useState } from "react";
import { socket } from "../socket";

export function MyForm({ name, roomName }) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket
      .timeout(5000)
      .emit(
        "message",
        { sender: name, context: value },
        roomName,
        () => {
          setIsLoading(false);
        }
      );
  }

  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setValue(e.target.value)} />

      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
}
