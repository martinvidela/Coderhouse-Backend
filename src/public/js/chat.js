const socketClient = io();
const userName = getElementById("username");
const chat = document.getElementById("chat");

let user = null;

if (!user) {
  Swal.fire({
    title: "Hi! Welcome to the support chat.",
    input: "text",
    text: "Enter a username",
    inputValidator: (value) => {
      if (!value) {
        return "Please enter a valid username :)";
      }
    },
    allowOutsideClick: false,
  }).then((result) => {
    user = result.value;
    username.innerHTML = user;
    socketClient.emit("authenticated", `usuario ${user} ha inciado sesion`);
  });
}



chatbox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatbox.value.trim().length > 0) {
      //corroboramos que el usuario no envie datos vacios
      socketClient.emit("message", { user: user, message: chatbox.value });
      chatbox.value = "";
    }
  }
});

socketClient.on("messageHistory", (dataServer) => {
  let messageElmts = "";
  dataServer.forEach((element) => {
    messageElmts += `${element.user}: ${element.message} <br/>`;
  });
  chat.innerHTML = messageElmts;
});

socketClient.on("newUser", (data) => {
  if (user) {
    //si ya el usuario esta autenticado, entonces puede recibir notificaciones
    Swal.fire({
      text: data,
      toast: true,
      position: "top-right",
    });
  }
});
