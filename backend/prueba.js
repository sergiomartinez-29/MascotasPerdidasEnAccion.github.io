document.getElementById('pet-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;

    const data = {
        name: form.name.value,
        species: form.species.value,
        photo: form.photo.value,
        lostdate: form.lostdate.value,
        race: form.race.value,
        size: form.size.value,
        reward: parseFloat(form.reward.value),
        temper: form.temper.value,
        color: form.color.value
    };

    const response = await fetch('https://shxefkrehmfropbodffn.supabase.co/rest/v1/animals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoeGVma3JlaG1mcm9wYm9kZmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MTEzNjMsImV4cCI6MjAzMTk4NzM2M30.Lh9a-T6_mPm52FMUszNM1jROfBhRO2wXX6xpNkrto6Y',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoeGVma3JlaG1mcm9wYm9kZmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MTEzNjMsImV4cCI6MjAzMTk4NzM2M30.Lh9a-T6_mPm52FMUszNM1jROfBhRO2wXX6xpNkrto6Y'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Mascota registrada exitosamente!');
        form.reset();
    } else {
        alert('Error al registrar la mascota.');
    }
});
