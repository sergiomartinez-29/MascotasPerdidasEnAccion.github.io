//seleccion de elementos*


const email = document.getElementById("correo");
const contraseña= document.getElementById("contraseña");
const aviso = document.getElementById(".texto-aviso");

const btnValidar = document.querySelector("button");

const correoRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-]))+$/;
const contraseñaRegex =  /^.{1,5}$/;
//Seccion de validacion*

btnValidar.addEventListener("click", e=>{
    e.preventDefault();
    let correo = email.value.trin();
    let contraseña = contraseña.value.trin();

    if(!correo){
        mostrarAviso("Ingresa una direccion de correo valida");
    }

    else if(!contraseña){
        mostrarAviso("Ingresa una contraseña valida");
    }

    else if(!correoRegex.test(correo)){
        mostrarAviso("ingresa un correo electronico valido");
    }

    else if(!contraseñaRegex.test(contraseña)){
        mostrarAviso("ingresa una contraseña valida debe contener 5 caracteres");
    }

    else if(autenticarUsuario)(correo, contraseña)=> { 
        window.location = "inicio.html";
    }

    else {
        mostrarAviso("El correo electronico o contraseña que ingresaste no estan asociados a una cuenta");
        email.value = "";
        contraseña.value = "";
    }
});

function autenticarUsuario(correo, contraseña){
    return correo === "linet_montemayor@hotmail.com" && contraseña === "linet123456" ;

}
function mostrarAviso(mensaje){
    aviso.style.color = "#FF2020";
    aviso.style.fontWeight = "800";
    aviso.textContent = mensaje;
    aviso.style.visibility = "inherit";
}