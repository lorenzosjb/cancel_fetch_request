import { useState, useRef } from 'react';

import reactLogo from './assets/react.svg';
import Hello from './components/Hello';
import './App.css';

function App() {
  /*
    From: https://youtu.be/ZqerXMzt-EY?si=ogkr8OhtI8gVjSo9
   */
  
  const [users, setUsers] = useState();
  const [fetchStatus, setFetchStatus] = useState("idle");
  const controllerRef = useRef<AbortController>();

  async function getUsers() {
    setFetchStatus("loading");

    controllerRef.current = new AbortController();

    const timeout = setTimeout(() => {
      setFetchStatus("delayed");
    }, 2000);

    fetch("http://localhost:3333/users", { 
      signal: controllerRef.current.signal
    })
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setFetchStatus("success");
      })
      .catch(err => {
        if (err.message.indexOf("aborted") > -1) {
          setFetchStatus("cancel");
        } else {
          setFetchStatus("error");
        }
      })
      .finally(() => {
        clearTimeout(timeout);
      });
  }

  function cancel() {
    controllerRef.current?.abort();
  }

  return (
    <div className="App">
      <button onClick={getUsers} disabled={fetchStatus === "loading" || fetchStatus === "delayed"}>
        Load users
      </button>
      {fetchStatus === "delayed" && (
        <>
          <div style={{ padding: "20 0" }}>This response is taking longer that expected.</div>
          <button onClick={cancel}>
            Stop
          </button>
        </>
      )}
      {fetchStatus === "cancel" && <div>Canceled</div>}
      {fetchStatus === "error" && <div>Error loading users</div>}
      {fetchStatus === "success" && <pre>{JSON.stringify(users, null, 2)}</pre>}
    </div>
  );
}

function AppOriginal() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <Hello count={count} />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <pre>
          Edit <code>src/App.tsx</code> and save to test HMR
        </pre>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App;
