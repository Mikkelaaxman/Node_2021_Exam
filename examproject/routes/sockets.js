const server = require("http").createServer(app);

const io = require("socket.io")(server);

const escapeHtml = require("html-escaper").escape;


io.on("connection", (socket) => {
    // console.log("A socket connected with id", socket.id);

    socket.on("colorChanged", (data) => {
        // changes the color for ALL the sockets in the io namespace
        io.emit("changeBackgroundToThisColor", { color: escapeHtml(data.color) });

        // changes the color ONLY for the socket that made the change
        // socket.emit("changeBackgroundToThisColor", data);

        // changes the color for ALL the sockets EXCEPT itself
        // socket.broadcast.emit("changeBackgroundToThisColor", data);
    });

    socket.on("disconnect", () => {
        console.log("A socket disconnect");
    });

});