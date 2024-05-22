function loguear() {
  let user = document.getElementById("correo").value;
  let pass = document.getElementById("contrasena").value;
  

  if (user === "linet_montemayor@hotmail.com" && pass === "linet123456") {
    window.location = "inicio.html";
  } else {
    alert("Datos incorrectos");
  }
}