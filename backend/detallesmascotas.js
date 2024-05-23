const SUPABASE_URL = 'https://shxefkrehmfropbodffn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoeGVma3JlaG1mcm9wYm9kZmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MTEzNjMsImV4cCI6MjAzMTk4NzM2M30.Lh9a-T6_mPm52FMUszNM1jROfBhRO2wXX6xpNkrto6Y';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get('id');

    if (!animalId) {
        console.error('No animal ID found in URL');
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('animals')
            .select('*')
            .eq('id', animalId)
            .single();

        if (error) throw error;

        displayAnimalDetails(data);
    } catch (error) {
        console.error('Error fetching animal details:', error);
    }
});

function displayAnimalDetails(animal) {
    document.getElementById('animal-name').textContent = animal.name;
    document.getElementById('animal-photo').src = animal.photo;
    document.getElementById('animal-lostdate').textContent = `Perdido desde: ${animal.lostdate}`;
    document.getElementById('animal-species').textContent = `Especie: ${animal.species}`;
    document.getElementById('animal-race').textContent = `Raza: ${animal.race}`;
    document.getElementById('animal-size').textContent = `Tamaño: ${animal.size}`;
    document.getElementById('animal-color').textContent = `Color: ${animal.color}`;
    document.getElementById('animal-temper').textContent = `Temperamento: ${animal.temper}`;
    document.getElementById('animal-reward').textContent = `Recompensa: $${animal.reward.toFixed(2)}`;
    document.getElementById('animal-owner').textContent = `Dueño: ${animal.owner}`;
}
