var express = require("express");
var cors = require('cors')
var app = express();

app.use(cors());

app.listen(3030, () => {
 console.log("Server running on port http://localhost:3030");
});

app.get("/url", (req, res, next) => {
    res.json(["Red","Lime","Magenta","Green","Fuchsia"]);
   });