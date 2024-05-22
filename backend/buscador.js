const filtroNombre = document.getElementById('filtro-nombre');
const tarjetas = document.querySelectorAll('.pet-card');

filtroNombre.addEventListener('input', function() {
    const valorBusqueda = filtroNombre.value.toLowerCase();

    tarjetas.forEach(tarjeta => {
        const nombreMascota = tarjeta.getAttribute('data-nombre').toLowerCase();

        if (nombreMascota.includes(valorBusqueda)) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none';
        }
    });
});