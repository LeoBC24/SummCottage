document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const registerBtn = document.getElementById('register');
  const loginBtn = document.getElementById('login');
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');

  registerBtn.addEventListener('click', () => {
    container.classList.add('active');
  });

  loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
  });

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('http://localhost:5157/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      alert(data.message);
      signupForm.reset();
    } catch (err) {
      alert('An error occurred');
      console.error(err);
    }
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    try {
      const res = await fetch('http://localhost:5157/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      // Debugging logs
      console.log("Login response status: ", res.status);
      console.log("Login response data: ", data);

      if (res.ok && data.user) {
        localStorage.setItem('userData', JSON.stringify({
          name: data.user.name,
          email: data.user.email
        }));
      
        alert(data.message || 'Login successful!');
        loginForm.reset();
        window.location.href = 'User.html';
      } else {
        alert(data.message || 'Login failed.');
      }
      
    } catch (err) {
      alert('An error occurred');
      console.error(err);
    }
  });
});
