import React, { useState } from "react";
import "./App.css";
import { debugURL } from "./fakeRequest";
import * as Sentry from "@sentry/react";

const FallbackComponent = () => {
  return <div>An error has occured, panic.</div>;
};

const App = () => {
  const [newData, setData] = useState("no data");

  const fetcher = () => {
    fetch(debugURL)
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          Sentry.captureException(response.status);
          return;
        }
        response.json().then(function (data) {
          console.log(data);
          setData(data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
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
