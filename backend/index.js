var express = require('express');
var cors = require('cors')
var app = express();

// Sentry
const Sentry = require("@sentry/node");

// const Tracing = require("@sentry/tracing");

Sentry.init({
  dsn: "https://6142479db5c04c51a0fc707abca44bfe@o463979.ingest.sentry.io/5469698",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());

const transaction = Sentry.startTransaction({
    op: "test correlative error features: thumbprint",
    name: "My First Test Transaction",
  });

// SERVER
app.use(cors());

app.get("/", function rootHandler(req, res) {
    res.end("Hello world!");
  });

  app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("Request failed");
  });

app.get("/url", (req, res, next) => {
    // res.json(["Red","Lime","Magenta","Green","Fuchsia"]);
    res.status(500).send('Something broke!')
    Sentry.captureException();
    transaction.finish();
   });

app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
  });

  app.listen(3030, () => {
    console.log("Server running on port http://localhost:3030");
   });

// setTimeout(() => {
//   try {
//     console.log('foo')
//   } catch (e) {
//     Sentry.captureException(e);
//   } finally {
//     transaction.finish();
//   }
// }, 99);
