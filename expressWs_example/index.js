const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);

// app.use(function(req, res, next) {
//   console.log("middleware");
//   req.testing = "testing";
//   return next();
// });

// app.get("/", function(req, res, next) {
//   console.log("get route", req.testing);
//   res.end();
// });

app.ws("/", function(ws, req) {
  ws.on("message", msg => {
    console.log("msg received:", msg);
    broadcast(msg);
  });
  console.log("connected");
  // ws.on("");
});

// app.ws("/a", function(ws, req) {});
var aWss = expressWs.getWss("/");

// setInterval(function() {
//   console.log(JSON.stringify(aWss));
//   aWss.clients.forEach(function(client) {
//     console.log("sending to client:", JSON.stringify(client));
//     client.send("hello");
//   });
// }, 10000);

app.listen(3000, () => {
  console.log("Listening for websockets on port: 3000..");
});

function broadcast(msg) {
  aWss.clients.forEach(client => {
    client.send(msg);
  });
}
