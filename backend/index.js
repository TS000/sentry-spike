var express = require("express");
var app = express();
app.listen(3000, () => {
 console.log("Server running on port http://localhost:3000");
});

app.get("/url", (req, res, next) => {
    res.json(["Red","Lime","Magenta","Green","Fuchsia"]);
   });