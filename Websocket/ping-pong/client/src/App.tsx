import { useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  function sendMessage() {
    if (!socket || !inputRef.current) {
      return;
    }
    const msg = inputRef.current.value;

    if (msg.trim() === "") {
      return;
    }

    socket.send(msg);
    inputRef.current.value = "";
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    setSocket(ws);

    ws.onmessage = (e) => {
      alert(e.data);
    };
  }, []);

  return (
    <>
      <div id="main-content">
        <input type="text" placeholder="Enter ping or pong" ref={inputRef} />

        <button onClick={sendMessage}>Submit</button>
      </div>
    </>
  );
}

export default App;
