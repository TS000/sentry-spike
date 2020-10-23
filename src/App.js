import React, { useState } from "react";
import "./App.css";
import * as Sentry from "@sentry/react";
import { v4 as uuidv4 } from "uuid";

const FallbackComponent = () => {
  return <div>An error has occured, panic.</div>;
};

const App = () => {
  const [newData, setData] = useState("no data");

  const fetcher = () => {
    let newID = uuidv4();
    let newHeaders = new Headers();
    newHeaders.append("reqID", newID);

    const newInit = {
      method: "GET",
      headers: newHeaders,
      mode: "cors",
      cache: "default",
    };

    const debugURL = "http://localhost:3030/url";

    const request = new Request(debugURL, newInit);
    fetch(request)
      .then((response) => {
        if (response.status !== 200) {
          throw TypeError(`Front End Error ID: ${newID}`);
        } else {
        response.text().then((data) => {
          console.log(data);
          setData(data);
        });
      }
      })
      .catch((err) => {
        // group errors together based on their request and response
        Sentry.withScope((scope) => {
          scope.setTag("Error ID", newID);
          Sentry.captureException(err);
        });
      });
  };
  return (
    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
      <div className="App">
        <header className="App-header">
          <button onClick={() => fetcher()} style={{ padding: "40, 100" }}>
            Break the world
          </button>
          <h4>Data: {newData}</h4>
        </header>
      </div>
    </Sentry.ErrorBoundary>
  );
};

export default App;
