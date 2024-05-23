// Configura Supabase
const { createClient } = supabase
const supabaseUrl = 'https://shxefkrehmfropbodffn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInNoeGVma3JlaG1mcm9wYm9kZmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MTEzNjMsImV4cCI6MjAzMTk4NzM2M30.Lh9a-T6_mPm52FMUszNM1jROfBhRO2wXX6xpNkrto6Y'
const supabase = createClient(supabaseUrl, supabaseKey)

async function registrarMascota(event) {
    event.preventDefault(); // Prevenir la recarga de la página
    
    const name = document.getElementById('nombree').value;
    const species = document.getElementById('especie').value;
    const lostdate = document.getElementById('fecha').value;
    const race = document.getElementById('raza').value;
    const size = document.getElementById('tamano').value;
    const reward = document.getElementById('recompensa').value;
    const temper = document.getElementById('temperamento').value;
    const color = document.getElementById('color').value;
    
    // Manejo de la fotografía
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    let photoUrl = '';

    if (file) {
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('photos')
            .upload(`public/${file.name}`, file);

        if (uploadError) {
            console.error('Error al subir la foto:', uploadError);
            return;
        }

        const { publicURL, error: urlError } = supabase
            .storage
            .from('photos')
            .getPublicUrl(`public/${file.name}`);

        if (urlError) {
            console.error('Error al obtener la URL de la foto:', urlError);
            return;
        }

        photoUrl = publicURL;
    }

    // Inserta los datos en la tabla 'animals'
    const { data, error } = await supabase
        .from('animals')
        .insert([
            {
                name: name,
                species: species,
                photo: photoUrl,
                lostdate: lostdate,
                race: race,
                size: size,
                reward: reward,
                temper: temper,
                color: color
            }
        ]);

    if (error) {
        console.error('Error al insertar los datos:', error);
    } else {
        console.log('¡Mascota registrada con éxito!', data);
        alert('¡Mascota registrada con éxito!');
    }
}

// Añade el evento de envío del formulario
document.getElementById('lostanimal').addEventListener('submit', registrarMascota);
