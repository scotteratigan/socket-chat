const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.broadcast.emit("chat message", "A new user connected.");
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
  });
  socket.on("typing", person => {
    console.log(person, "is typing");
    io.emit("typing", person); // socket.broadcast.emit seemed to only send to other users, which makes some sense...
  });
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

http.listen(1000, function() {
  console.log("listening on *:1000");
});
