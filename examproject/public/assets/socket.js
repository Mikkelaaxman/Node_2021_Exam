const socket = io();

function sendColor() {
    const color = document.getElementById("color-picker").value

    socket.emit("colorChanged", { color });
}

socket.on("changeBackgroundToThisColor", (data) => {
    document.body.style.backgroundColor = data.color;
    document.getElementById("choosen-color").innerText = data.color;
});