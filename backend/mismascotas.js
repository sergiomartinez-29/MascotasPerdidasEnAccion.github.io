// Initialize Supabase client
const SUPABASE_URL = 'https://shxefkrehmfropbodffn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoeGVma3JlaG1mcm9wYm9kZmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MTEzNjMsImV4cCI6MjAzMTk4NzM2M30.Lh9a-T6_mPm52FMUszNM1jROfBhRO2wXX6xpNkrto6Y';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let allAnimals = [];

// Fetch animals from Supabase
async function fetchAnimals() {
    const userEmail = localStorage.getItem('userEmail');  // Recupera el correo electrónico del usuario
    if (!userEmail) {
        console.error('No user email found in localStorage');
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('animals')
            .select('*')
            .eq('owner', userEmail);  // Filtra por el correo electrónico del usuario

        if (error) throw error;

        if (data.length === 0) {
            console.log('No animals found');
            return;
        }

        allAnimals = data;
        displayAnimals(data);
    } catch (error) {
        console.error('Error fetching animals:', error);
    }
}

// Display animals on the page
function displayAnimals(animals) {
    const container = document.getElementById('animal-container');
    container.innerHTML = ''; // Clear the container before adding new elements

    animals.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('animal-card');

        card.innerHTML = `
            <p>Perdido desde: ${animal.lostdate}</p>
            <img src="${animal.photo}" alt="${animal.name}">
            <h3>${animal.name}</h3>
            <p>Especie: ${animal.species}</p>
            <p>Raza: ${animal.race}</p>
            <p>Color: ${animal.color}</p>
            <p>Tamaño: ${animal.size}</p>
            <p class="recompensa">Recompensa: $${animal.reward.toFixed(2)}</p>
            <button class="ver-mas-btn" data-id="${animal.id}">Ver más</button>
        `;

        container.appendChild(card);
    });

    // Add event listeners to the buttons
    const buttons = document.querySelectorAll('.ver-mas-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const animalId = button.getAttribute('data-id');
            window.location.href = `info_adicional1.html?id=${animalId}`;
        });
    });
}

// Filter animals by name
function filterAnimalsByName(name) {
    const filteredAnimals = allAnimals.filter(animal =>
        animal.name.toLowerCase().includes(name.toLowerCase())
    );
    displayAnimals(filteredAnimals);
}

// Event listener for the search input
document.getElementById('filtro-nombre').addEventListener('input', (event) => {
    filterAnimalsByName(event.target.value);
});

// Load animals when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', fetchAnimals);
