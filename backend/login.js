// URL y clave pública de Supabase
const SUPABASE_URL = 'https://shxefkrehmfropbodffn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoeGVma3JlaG1mcm9wYm9kZmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MTEzNjMsImV4cCI6MjAzMTk4NzM2M30.Lh9a-T6_mPm52FMUszNM1jROfBhRO2wXX6xpNkrto6Y';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = event.target.email.value;
    const password = event.target.password.value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    const messageDiv = document.createElement('div');
    if (error) {
        messageDiv.textContent = `Error: ${error.message}`;
        messageDiv.style.color = 'red';
    } else {
        messageDiv.textContent = 'Inicio de sesión exitoso.';
        messageDiv.style.color = 'green';
        window.location.href = 'inicio.html';
    }
    loginForm.appendChild(messageDiv);
});
