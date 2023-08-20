const socketClient = io();
const userName = document.getElementById("username");
const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje");

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
    userName.innerHTML = user;
    socketClient.emit("authenticated", `usuario ${user} ha inciado sesion`);
  });
}

formulario.onsubmit = (e) => {
  e.preventDefault();
  const data = {
    user: user,
    message: mensaje.value,
  };
  socketClient.emit("mensaje", data);
  mensaje.value = "";
};

socketClient.on("chat", (data) => {
  const chatRender = data
    .map((e) => {
      const formattedTime = new Date(e.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `<p><strong>${e.user}</strong> (${formattedTime}): ${e.message}</p>`;
    })
    .join("");
  chat.innerHTML = chatRender;
});

socketClient.on("newUser", (data) => {
  console.log(data);
  if (user) {
    //si ya el usuario esta autenticado, entonces puede recibir notificaciones
    Swal.fire({
      text: `New user online, say hi!`,
      toast: true,
      position: "top-right",
    });
  }
});
document.getElementById("clearChat").addEventListener("click", () => {
  document.getElementById("chat").textContent = "";
  socketClient.emit("clearchat");
});
