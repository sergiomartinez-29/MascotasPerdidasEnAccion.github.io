const SUPABASE_URL = 'https://shxefkrehmfropbodffn.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoeGVma3JlaG1mcm9wYm9kZmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MTEzNjMsImV4cCI6MjAzMTk4NzM2M30.Lh9a-T6_mPm52FMUszNM1jROfBhRO2wXX6xpNkrto6Y';

    const { createClient } = supabase;
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const signupForm = document.getElementById('signup-form');
    const messageDiv = document.getElementById('message');

    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const email = event.target.email.value;
      const password = event.target.password.value;

      const { user, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
      });

      if (error) {
        messageDiv.textContent = `Error: ${error.message}`;
        messageDiv.style.color = 'red';
      } else {
        messageDiv.textContent = 'Registro exitoso. Por favor, verifica tu correo electrónico.';
        messageDiv.style.color = 'green';
        signupForm.reset();
      }
    });